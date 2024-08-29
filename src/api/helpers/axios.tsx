import axios, { AxiosError, AxiosResponse } from 'axios';

const API_URL = '/proxy';

export const instance = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      localStorage.setItem('showAuthTimeoutSnackbar', 'true');

      window.location.href = '/auth';

      return new Promise(() => {});
    }

    return Promise.reject(error);
  },
);
