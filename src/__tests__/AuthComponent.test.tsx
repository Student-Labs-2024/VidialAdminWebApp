import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';

import { DefaultTheme } from 'theme/DefaultTheme';
import AuthComponent from 'routes/AuthPage/AuthComponent';
import { MemoryRouter } from 'react-router-dom';

describe('AuthComponent', () => {
  it('renders the logo and bro image', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={DefaultTheme}>
          <AuthComponent />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByAltText('Vidial_logo')).toBeInTheDocument();
    expect(screen.getByAltText('Vidial_picture')).toBeInTheDocument();
  });

  it('renders the login form when login tab is clicked', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={DefaultTheme}>
          <AuthComponent />
        </ThemeProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Вход'));

    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  it('renders the registration form when registration tab is clicked', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={DefaultTheme}>
          <AuthComponent />
        </ThemeProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Регистрация'));

    expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
  });
});
