import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { DefaultTheme } from 'theme/DefaultTheme';
import AuthComponent from 'routes/AuthPage/AuthComponent';
import { MemoryRouter } from 'react-router';

describe('AuthComponent', () => {
  it('renders the logo and bro image', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <ThemeProvider theme={DefaultTheme}>
          <AuthComponent />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(getByAltText('Vidial_logo')).toBeInTheDocument();
    expect(getByAltText('Vidial_picture')).toBeInTheDocument();
  });

  it('renders the login form', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ThemeProvider theme={DefaultTheme}>
          <AuthComponent />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(getByText('Вход')).toBeInTheDocument();
  });
});
