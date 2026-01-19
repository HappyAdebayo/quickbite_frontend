import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // your backend base URL
  // Don't set Content-Type here globally, let the hook handle JSON vs FormData
});

// Optional: Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
