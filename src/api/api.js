import axios from 'axios';
import { getToken } from '../utils/auth';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust to your backend URL
});

API.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (credentials) => API.post('/auth/login', credentials);

export const uploadExcelFile = (formData) =>
  API.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

export const getUserHistory = () => API.get('/history');
