import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cf-endpoint-proxy.herokuapp.com/webapi/v1/",
});

export default axiosInstance;
