// nuxt.config.ts
export default defineNuxtConfig({
  server: {
    port: 3000, // Cổng mà ứng dụng của bạn sẽ lắng nghe
    host: '0.0.0.0' // Lắng nghe trên tất cả các địa chỉ IP (IPv4 và IPv6)
  },
  ssr:true,
  appConfig: {
    apiURL: {
      API: (process.env.API_URL || 'https://api.jobspeeds.com').replace(/^\/+|\/+$/g, '')
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en"
      },
      title: "Job Speeds",
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: 'https://api.jobspeeds.com/logo/logo.JPG' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: 'https://api.jobspeeds.com/logo/logo.JPG' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: 'https://api.jobspeeds.com/logo/logo.JPG' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: 'https://api.jobspeeds.com/logo/logo.JPG' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: 'https://api.jobspeeds.com/logo/logo.JPG'},
        { rel: 'manifest', href: '/manifest.json' }
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name:"google-adsense-account", content:"ca-pub-4065642758618862"},
        { name: "description", content: "Kết nối người tìm việc và nhà tuyển dụng với Job Speeds."  },
        { 
          name: "keywords", 
          content: "Recruitment, employment, job search, unemployment, job application, online job search, job seeker, employer, recruiting company, labor market, career transition, job opportunities, job interview, job resume, job search skills, employee benefits, vocational training, work experience, salary, industry, vocational education, new job search, suitable job, workplace location, professional competence, work motivation,Tuyển dụng, việc làm, tìm việc, thất nghiệp, xin việc, tìm việc online, người tìm việc, nhà tuyển dụng, công ty tuyển dụng, thị trường lao động, chuyển đổi nghề nghiệp, cơ hội nghề nghiệp, phỏng vấn việc làm, hồ sơ xin việc, kỹ năng tìm kiếm việc làm, lợi ích nhân viên, khóa học nghề nghiệp, kinh nghiệm làm việc, mức lương, ngành nghề, đào tạo nghề, tìm kiếm việc làm mới, công việc phù hợp, địa điểm làm việc, bản lĩnh nghề nghiệp, động lực làm việc" 
        },
        { name: "author", content: "Anhld" },
        { name: "robots", content: "index, follow" }, // Chỉ định cách bot của công cụ tìm kiếm phải xử lý trang
        { name: "og:image", content: "https://api.jobspeeds.com/logo/logo.JPG" },
        { name: "og:url", content: "https://jobspeeds.com" },
        { name: "application-name", content: "Job Speeds" },
        { name: "theme-color", content: "#ffffff" }, // Màu nền của ứng dụng
        { name: "apple-mobile-web-app-capable", content: "yes" }, // Có thể mở ứng dụng trên thiết bị di động của Apple
        { name: "apple-mobile-web-app-status-bar-style", content: "#ffffff" }, // Màu thanh trạng thái của ứng dụng trên thiết bị di động của Apple
        { name: "apple-mobile-web-app-title", content: "Job Speeds" }, // Tiêu đề cho ứng dụng trên thiết bị di động của Apple
      ]
    }
  },
  proxy: {
    '/api': {
      target: 'https://api.jobspeeds.com',
      pathRewrite: { '^/api': '/' },
      changeOrigin: true,
    }
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '~/assets/scss/style.scss',
  ],
  modules: [
    '@pinia/nuxt', "@nuxtjs/tailwindcss", '@nuxtjs/sitemap', '@nuxt/image'
  ],
  sitemap: {
    // Cấu hình cho sitemap
    hostname: 'https://jobspeeds.com', // Địa chỉ URL gốc của trang web của bạn
    exclude: ['/admin/**'], // Các URL bạn muốn loại trừ khỏi sitemap
    // Các cấu hình khác cho sitemap
  },
  pinia: {
    autoImports: ['auth', 'acceptHMRUpdate']
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  experimental: {
    appManifest: true
  },
  imports: {
    dirs: ['stores'],
  },
  // Middleware CORS
  serverMiddleware: [
    {
      path: '/api',
      handler: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://jobspeeds.com');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Headers', 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization');
        if (req.method === 'OPTIONS') {
          res.writeHead(200);
          res.end();
        } else {
          next();
        }
      }
    }
  ]
});