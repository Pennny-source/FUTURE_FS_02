import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/auth`
});

export const authService = {
  login: async (email, password) => {
    const { data } = await API.post('/login', { email, password });
    return data;
  },
  signup: async (name, email, password) => {
    const { data } = await API.post('/signup', { name, email, password });
    return data;
  },
  forgotPassword: async (email) => {
    const { data } = await API.post('/forgot-password', { email });
    return data;
  },
};