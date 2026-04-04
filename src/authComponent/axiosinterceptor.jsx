import axios from "axios";
import { refreshAccessToken } from "./auth";
import { getCookie } from "../Helper/CookieHelper";

axios.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("AccessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set up response interceptor to handle token refresh and retry logic
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Perform token refresh logic, e.g., using your refreshTokenAndRetry function
      await refreshAccessToken();
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axios;
