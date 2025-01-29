import axios from "axios";
import {
  BASE_URL,
  getAccessToken,
  isTokenExpired,
  refreshAccessToken,
} from "./collections/auth";

export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    async (config) => {
      let token = getAccessToken();

      // Token varsa ve süresi dolmuşsa yenile
      if (token && isTokenExpired(token)) {
        try {
          token = await refreshAccessToken();
        } catch (error) {
          // Token yenileme başarısız olursa isteği reddet
          return Promise.reject(error);
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 401 hatası alındıysa ve bu ilk deneme ise token'ı yenilemeyi dene
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
