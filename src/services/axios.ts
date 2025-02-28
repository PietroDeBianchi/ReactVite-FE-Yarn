import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: "http://localhost:3000/api/v1", 
    withCredentials: true, // Delegate cookies
    headers: {
        "Content-Type": "application/json",
    },
});

// Global response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized request, redirecting to login...");
            window.location.href = "/"; // Redirect to Login
        }
        return Promise.reject(error);
    }
);

export default api;
