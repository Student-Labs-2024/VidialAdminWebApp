import axios from 'axios';

const API_URL = '/api';

export const instance = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  withCredentials: true,
});
