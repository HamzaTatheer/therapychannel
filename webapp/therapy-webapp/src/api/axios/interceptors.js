import { instance } from "./axios-config";

export const addInterceptors = (instance) => {
  instance.interceptors.request.use(addToken, handleRequestError);
  instance.interceptors.response.use(handleResponseOK, handleResponseError);
};

export const addToken = (config) => {
  const token = localStorage.getItem("token");
  return { ...config, headers: { Authorization: token } };
};

export const handleRequestError = (error) => {
  console.log("handleRequestError", error);
  return Promise.reject(error);
};

export const handleResponseOK = (response) => {
  console.log("handleResponseOK", response);
  return response;
};

export const handleResponseError = (error) => {
  console.log("handleResponseError", error);
  //if (error.response.status === 401) {
  //return handleRefreshToken(error.config);
  //}
  return Promise.reject(error);
};

const handleRefreshToken = (config) => {
  return new Promise((resolve, reject) => {
    const refreshToken = localStorage.getItem("refreshtoken");
    console.log("Asking for new access token by using : ", refreshToken);
    instance
      .request({
        url: `/token`,
        headers: { "x-refresh-token": refreshToken },
        method: "get",
      })
      .then((response) => {
        const accessToken = response.headers["x-token"];
        console.log("RESPONSE: ");
        console.log(response.headers);
        localStorage.setItem("accesstoken", accessToken);
        console.log("new Access Token", accessToken);
        instance
          .request({
            ...config,
            data: config.data ? JSON.parse(config.data) : null,
            headers: { "x-token": accessToken },
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// axios.interceptors.request.use((config) => {
//     const accessToken = localStorage.getItem('accessToken');
//     return { ...config, headers: { 'accesstoken': accessToken } };
// }, (error) => {
//     return Promise.reject(error);
// });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   });
