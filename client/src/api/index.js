import axios from 'axios';

const token = sessionStorage.getItem('token');

const api = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default api;
