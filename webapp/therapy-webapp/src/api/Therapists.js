const { secure_instance } = require("./axios/axios-config");

export const showTherapists = () => {
  return secure_instance.request({
    url: "/show_therapists",
    method: "get",
  });
};
