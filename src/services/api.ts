import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: "http://localhost:3000/api/v1", 
    withCredentials: true, // Delegate cookies
    headers: {
        "Content-Type": "application/json",
    },
});
export default api;
