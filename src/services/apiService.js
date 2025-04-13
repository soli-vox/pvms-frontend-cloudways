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
    console.log("Request config:", config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn(
        "No token found - making unauthenticated request (expected for /login)"
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error:", error.response || error.request || error.message);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized - redirecting to login");
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 404:
          console.error("Endpoint not found:", error.config.url);
          break;
        case 422:
          console.error(
            "Validation error:",
            error.response.data.errors || error.response.data.message
          );
          return Promise.reject({
            message: "Validation failed",
            errors: error.response.data.errors,
          });
        case 500:
          console.error("Server error:", error.message);
          break;
        default:
          console.error("Unexpected error:", error.message);
      }
    } else if (error.request) {
      console.error("Network error (CORS?)", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiService;
