export default (appConfig, $moment, $filters, $_) => {
    const getProfile = async  (userId,option = {}) => {
      //Merge options.
      const fetchOption = {
        ...option,
        method: "GET",
      };
      return await useFetch(`${appConfig.apiURL.API}/profile/${userId}`, fetchOption);
    };
    return {
        getProfile,
    };
  };
  