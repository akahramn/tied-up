import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Token interceptor
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//401 durumunda login sayfasına yönlendir
instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token'); // Token'ı temizle
            window.location.href = '/login'; // Login sayfasına yönlendir
        }
        return Promise.reject(error);
    }
);

export default instance;
