import axios from "axios";
import {
  addInterceptors,
  addToken,
  handleRequestError,
  handleResponseOK,
  handleResponseError,
} from "./interceptors";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 60000,
});

const secure_instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 60000,
});

secure_instance.interceptors.request.use(addToken, handleRequestError);
secure_instance.interceptors.response.use(
  handleResponseOK,
  handleResponseError
);

export { instance, secure_instance };
