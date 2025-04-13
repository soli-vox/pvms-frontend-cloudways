import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", API_BASE_URL);

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found - making unauthenticated request");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized - redirecting to login");
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          console.error("Forbidden - insufficient permissions");
          break;
        case 404:
          console.error("Endpoint not found:", error.config.url);
          break;
        case 500:
          console.error("Server error:", error.message);
          break;
        default:
          console.error("Unexpected error:", error.message);
      }
    }
    return Promise.reject(error);
  }
);

export default apiService;
