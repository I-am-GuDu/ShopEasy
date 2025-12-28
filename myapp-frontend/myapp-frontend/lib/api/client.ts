import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '../store/authStore';

// Create Axios instance with base URL from environment
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Authorization header with token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized errors by clearing auth state
    if (error.response?.status === 401) {
      const authStore = useAuthStore.getState();
      authStore.logout();
      authStore.setError('Session expired, please log in again');
      
      // Redirect to login page if not already there
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    // Handle 5xx server errors with generic message
    if (error.response?.status && error.response.status >= 500) {
      const authStore = useAuthStore.getState();
      authStore.setError('Server error, please try again later');
    }
    
    // Handle network errors gracefully
    if (!error.response) {
      const authStore = useAuthStore.getState();
      authStore.setError('Network error, please check your connection');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
