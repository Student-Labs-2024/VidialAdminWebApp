import AuthRegister from 'types/Auth/AuthRegister';
import { instance } from './helpers/axios';

export const auth = {
  register: async (
    email: string,
    password: string,
    is_active: boolean,
    is_superuser: boolean,
    is_verified: boolean,
  ) => {
    const response = await instance.post<AuthRegister>('/admin/auth/register', {
      email,
      password,
      is_active,
      is_superuser,
      is_verified,
    });

    return response.data;
  },

  login: async (username: string, password: string) => {
    const response = await instance.post<AuthRegister>(
      '/admin/auth/login',
      { username, password },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  },

  logout: async () => {
    await instance.post('/admin/auth/logout');
  },
};
