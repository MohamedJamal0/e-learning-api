import axios from 'axios';

export const ElearningApi = axios.create({
  baseURL: import.meta.env.VITE_ELEARNING_API_URL,
  withCredentials: true,
});
