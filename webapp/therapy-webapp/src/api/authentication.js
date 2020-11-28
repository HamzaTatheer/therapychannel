import { instance, instance_authenticated } from "./axios/axios-config";

export const login = ({ email, password }) => {
  return instance.request({
    url: "/login",
    method: "post",
    data: {
      email: email,
      password: password,
    },
  });
};

export const logOut = () => {
  let refreshToken = localStorage.getItem("refreshtoken");
  console.log("deleting " + refreshToken);
  return instance.request({
    url: `/logout`,
    headers: { "x-refresh-token": refreshToken },
    method: "delete",
  });
};
