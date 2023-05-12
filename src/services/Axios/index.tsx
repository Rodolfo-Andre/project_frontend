import axios, { AxiosError } from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const axiosObject = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:7208",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
  httpsAgent: agent,
});

axiosObject.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.request.status === 401) {
      localStorage.removeItem("access_token");
    }

    return Promise.reject(error);
  }
);

export default axiosObject;
