import { makeAutoObservable } from 'mobx';

class AuthStore {
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  login(username: string, password: string) {
    const ADMIN_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  logout() {
    this.isAuthenticated = false;
  }
}

const authStore = new AuthStore();
export default authStore;
