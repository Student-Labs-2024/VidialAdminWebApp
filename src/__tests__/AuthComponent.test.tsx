import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';

import { DefaultTheme } from 'theme/DefaultTheme';
import AuthComponent from 'routes/AuthPage/AuthComponent';

describe('AuthComponent', () => {
  it('renders the logo and bro image', () => {
    const { getByAltText } = render(
      <React.Fragment>
        <ThemeProvider theme={DefaultTheme}>
          <AuthComponent />
        </ThemeProvider>
      </React.Fragment>,
    );

    expect(getByAltText('Vidial_logo')).toBeTruthy();
    expect(getByAltText('Vidial_picture')).toBeTruthy();
  });

  it('renders the login form', () => {
    const { getByText } = render(
      <React.Fragment>
        <ThemeProvider theme={DefaultTheme}>
          <AuthComponent />
        </ThemeProvider>
      </React.Fragment>,
    );

    expect(getByText('Вход')).toBeTruthy();
  });
});
