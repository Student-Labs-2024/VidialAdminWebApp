import { makeAutoObservable } from 'mobx';

class AuthStore {
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
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
