import { AxiosRequestConfig } from "axios";

const { VITE_API } = import.meta.env;

export const AXIOS_OPTION: AxiosRequestConfig = {
  baseURL: VITE_API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000
};
