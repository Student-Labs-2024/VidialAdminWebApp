import { makeAutoObservable } from 'mobx';

class AuthStore {
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');

    if (storedAuthStatus === 'true') {
      this.isAuthenticated = true;
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('isAuthenticated', String(this.isAuthenticated));
  }

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      this.saveToLocalStorage();
    } else {
      this.isAuthenticated = false;
      this.saveToLocalStorage();
    }
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }
}

const authStore = new AuthStore();
export default authStore;
