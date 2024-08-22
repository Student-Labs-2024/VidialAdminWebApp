import { makeAutoObservable } from 'mobx';
import { toast, Slide } from 'react-toastify';

import api from 'api/index';
import axios from 'axios';

class AuthStore {
  isAuthenticated: boolean | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadAuthState();
  }

  loadAuthState() {
    const storedAuthState = localStorage.getItem('isAuthenticated');

    if (storedAuthState === 'true') {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  saveAuthState() {
    if (this.isAuthenticated !== null) {
      localStorage.setItem('isAuthenticated', String(this.isAuthenticated));
    }
  }

  async register(
    email: string,
    password: string,
    is_active: boolean,
    is_superuser: boolean,
    is_verified: boolean,
  ) {
    this.isLoading = true;
    this.error = null;

    try {
      await api.auth.register(
        email,
        password,
        is_active,
        is_superuser,
        is_verified,
      );
      this.isAuthenticated = true;
      this.saveAuthState();
      toast.success('Вы успешно зарегистрировались!', { transition: Slide });
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        toast.error('Произошла непредвиденная ошибка!', { transition: Slide });
        this.error = (error as Error).message;
        this.isAuthenticated = false;
        this.saveAuthState();

        return;
      }

      const responseDetail = error.response?.data?.detail;

      if (responseDetail === 'REGISTER_USER_ALREADY_EXISTS') {
        toast.error('Пользователь с такой почтой уже существует!', {
          transition: Slide,
        });
      } else if (responseDetail.code === 'REGISTER_INVALID_PASSWORD') {
        toast.error(`Ошибка регистрации: ${responseDetail.reason}`, {
          transition: Slide,
        });
      } else {
        toast.error('Произошла ошибка при регистрации!', { transition: Slide });
      }

      this.error = responseDetail || (error as Error).message;
      this.isAuthenticated = false;
      this.saveAuthState();
    } finally {
      this.isLoading = false;
    }
  }

  async login(email: string, password: string) {
    this.isLoading = true;
    this.error = null;

    try {
      await api.auth.login(email, password);
      this.isAuthenticated = true;
      this.saveAuthState();
      toast.success('Добро пожаловать!', { transition: Slide });
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        toast.error('Произошла непредвиденная ошибка!', { transition: Slide });
        this.error = (error as Error).message;
        this.isAuthenticated = false;
        this.saveAuthState();

        return;
      }

      const responseDetail = error.response?.data?.detail;

      if (responseDetail === 'LOGIN_BAD_CREDENTIALS') {
        toast.error('Плохие куки или пользователь неактивен!', {
          transition: Slide,
        });
      } else if (responseDetail.code === 'LOGIN_USER_NOT_VERIFIED') {
        toast.error('Пользователь неактивен', { transition: Slide });
      } else {
        toast.error('Произошла ошибка при входе!', { transition: Slide });
      }

      this.error = (error as Error).message;
      this.isAuthenticated = false;
      this.saveAuthState();
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    this.isLoading = true;
    this.error = null;

    try {
      await api.auth.logout();
      this.isAuthenticated = false;
      this.saveAuthState();
      toast.success('Вы вышли!', { transition: Slide });
    } catch (error) {
      this.error = (error as Error).message;
    } finally {
      this.isLoading = false;
    }
  }
}

const authStore = new AuthStore();
export default authStore;
