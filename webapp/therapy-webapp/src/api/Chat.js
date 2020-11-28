const { secure_instance } = require("./axios/axios-config");

export const LoadMessages = (to) => {
  return secure_instance.request({
    url: "/LoadMessages/" + to,
    method: "get",
  });
};
