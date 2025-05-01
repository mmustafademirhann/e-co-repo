import axios from 'axios';
import store from '../redux/store';
import { setUser } from '../redux/actions/clientActions';

// Create Axios instance with expanded configuration
const axiosInstance = axios.create({
    baseURL: 'https://workintech-fe-ecommerce.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, // Increase timeout to 10 seconds
    // Add client version header for debugging
    headers: {
        'Content-Type': 'application/json',
        'X-Client-Version': '1.0'
    }
});

console.log("Axios instance created with baseURL:", axiosInstance.defaults.baseURL);

// Request interceptor to add token and log requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        
        // Log outgoing requests for debugging
        console.log(`[API Request] ${config.method.toUpperCase()} ${config.baseURL}${config.url}`, {
            headers: config.headers,
            params: config.params,
            data: config.data
        });
        
        return config;
    },
    (error) => {
        console.error("[API Request Error]", error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
    (response) => {
        // Log successful responses
        console.log(`[API Response] ${response.config.method.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data
        });
        return response;
    },
    async (error) => {
        // Log failed responses
        console.error("[API Response Error]", {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message
        });
        
        const originalRequest = error.config;

        // If the error is 401 and we have a token, it means the token is invalid or expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Clear invalid token and user data
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            store.dispatch(setUser(null));
            
            // Remove Authorization header
            delete axiosInstance.defaults.headers.common['Authorization'];

            // Redirect to login if needed
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;