// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  appConfig: {
    apiURL: {
      API: (process.env.API_URL || '').replace(/^\/+|\/+$/g, ''),
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en"
      },
      title: "Job Speeds",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "Access-Control-Allow-Origin", content: "*" },
        { name: "Access-Control-Allow-Methods", content: "GET, POST, OPTIONS" },
        { name: "Access-Control-Allow-Credentials", content: "true" },
        { name: "Access-Control-Allow-Headers", content: "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization" },
      ]
    }
  },
  proxy: {
    '/api': {
      target: 'http://localhost:2024', // URL của máy chủ backend
      pathRewrite: { '^/api': '/' },
      changeOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*' // Thêm tiêu đề vào yêu cầu tới máy chủ backend
      }
    }
  },
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  modules: [
    '@pinia/nuxt',"@nuxtjs/tailwindcss"
  ],
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
    appManifest: false
  },
  
  imports: {
    dirs: ['stores'],
  },
 
})
