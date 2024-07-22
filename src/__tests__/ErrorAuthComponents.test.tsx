import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorAuthComponent from '../routes/AuthPage/ErrorAuthComponent';
import DefaultTheme from '../theme/DefaultTheme';
import { ThemeProvider } from '@mui/material/styles';

describe('ErrorAuthComponent', () => {
  it('renders the error message', () => {
    const { getByText } = render(
      <React.Fragment>
        <ThemeProvider theme={DefaultTheme}>
          <ErrorAuthComponent />
        </ThemeProvider>
      </React.Fragment>,
    );
    expect(getByText('Ошибка 404')).toBeTruthy();
  });
});
