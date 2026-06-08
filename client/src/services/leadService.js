import axios from 'axios';

const API = axios.create({ baseURL: 'http://import.meta.env.VITE_API_URL/api/leads' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const leadService = {
  getAll: (params) => API.get('/', { params }),
  getOne: (id) => API.get(`/${id}`),
  create: (leadData) => API.post('/', leadData),
  update: (id, leadData) => API.put(`/${id}`, leadData),
  delete: (id) => API.delete(`/${id}`),
};