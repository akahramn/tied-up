import api from '../../api/axiosInstance';

export const getCourseListByUserId = (userId) => api.get(`/course/fetch-course-list-by-instructor-id/${userId}`);
export const createCourse = (data) => api.post('/course/create', data);
export const updateCourse = (id, data) => api.put(`/course/update/${id}`, data);
export const getCourseById = (id) => api.get(`/course/${id}`);
export const fetchAllCourses = () => api.get(`/course/fetch-all-courses`);
export const enrollCourse = (data) => api.post(`/course/enroll`, data);
export const searchCourse = (data) => api.post(`/course/search`, data);
