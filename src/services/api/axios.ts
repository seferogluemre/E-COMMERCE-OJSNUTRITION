import axios from "axios";
import { BASE_URL } from "./types";
import { getAccessToken } from "./collections/storage";

export const createAxiosInstance = () => {
  const token = getAccessToken();

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return instance;
};
