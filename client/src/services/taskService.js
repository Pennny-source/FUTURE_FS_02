import axios from 'axios';

const API_URL = 'http://import.meta.env.VITE_API_URL/api/tasks';

export const taskService = {
  getAll: () =>
    axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),

  create: (data) =>
    axios.post(API_URL, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),

  update: (id, data) =>
    axios.put(`${API_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }),

  delete: (id) =>
    axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
};