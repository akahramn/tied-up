import api from '../../api/axiosInstance';

export const getCourseListByUserId = (userId) => api.get(`/course/fetch-course-list-by-instructor-id/${userId}`);
export const createCourse = (data) => api.post('/course/create', data);
export const updateCourse = (id, data) => api.put(`/course/update/${id}`, data);
export const getCourseById = (id) => api.get(`/course/${id}`);
