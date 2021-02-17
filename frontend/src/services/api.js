import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(config => {
  const user = store.getState().auth.user;
  config.headers['Authorization'] = user ? `Bearer ${user.token}` : '';
  return config;
});

export default api;
