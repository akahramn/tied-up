import api from '../api/axiosInstance';

export const getProfile = () => api.get('/user/me');
export const updateProfile = (data) => api.put('/user/update', data);
