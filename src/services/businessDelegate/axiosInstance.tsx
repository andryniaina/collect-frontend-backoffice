import axios from "axios";
import { BACKEND_URL } from "../../config/url";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/`,
  headers: {
    'Content-Type': 'application/json',
  },
  maxBodyLength: Infinity,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
    return config;
  },
  (error) => {

    return Promise.reject(error)
  }
);

export default axiosInstance;