import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { DefaultTheme } from 'theme/DefaultTheme';
import Sidebar from 'layouts/SidebarComponents/Sidebar';

describe('Sidebar component', () => {
  const renderSidebar = () =>
    render(
      <React.Fragment>
        <ThemeProvider theme={DefaultTheme}>
          <BrowserRouter>
            <Sidebar />
          </BrowserRouter>
        </ThemeProvider>
      </React.Fragment>,
    );

  it('renders correctly', () => {
    const { getByAltText, getByText } = renderSidebar();

    expect(getByAltText('Vidial_logo')).toBeTruthy();

    expect(getByText('Главная панель')).toBeTruthy();
    expect(getByText('Контент')).toBeTruthy();
    expect(getByText('Пользователи')).toBeTruthy();
    expect(getByText('Выйти')).toBeTruthy();
  });

  it('toggles content sub-items correctly', () => {
    const { getByText } = renderSidebar();

    fireEvent.click(getByText('Контент'));

    expect(getByText('Акции')).toBeTruthy();
    expect(getByText('Услуги')).toBeTruthy();
    expect(getByText('Товары')).toBeTruthy();
    expect(getByText('Филиалы')).toBeTruthy();
    expect(getByText('Доктора')).toBeTruthy();
  });
});
