import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthComponent from 'routes/AuthPage/AuthComponent';
import MainPage from 'routes/MainPage/MainPage';

jest.mock('routes/AuthPage/AuthComponent', () => ({
  ...jest.requireActual('routes/AuthPage/AuthComponent'),
  handleLogin: jest.fn(),
}));

describe('AuthComponent', () => {
  it('renders the login form', () => {
    render(
      <Router>
        <AuthComponent />
      </Router>,
    );

    expect(screen.getByText('Вход')).toBeInTheDocument();
  });

  it('navigates to main page on successful login', async () => {
    const { handleLogin } = require('routes/AuthPage/AuthComponent');

    handleLogin.mockImplementation(() => {
      return Promise.resolve(true);
    });

    render(
      <Router>
        <Routes>
          <Route path="/" element={<AuthComponent />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>,
    );

    fireEvent.change(screen.getByPlaceholderText('Логин'), {
      target: { value: 'user' },
    });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText('Войти'));

    await screen.findByText('Main Page');

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });
});
