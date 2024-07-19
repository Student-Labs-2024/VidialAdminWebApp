import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../layouts/SidebarComponents/Sidebar';
import DefaultTheme from '../theme/DefaultTheme';
import { ThemeProvider } from '@mui/material/styles';

describe('Sidebar component', () => {
    const renderSidebar = () =>
        render(
            <React.Fragment>
                <ThemeProvider theme={DefaultTheme}>
                    <BrowserRouter>
                        <Sidebar />
                    </BrowserRouter>
                </ThemeProvider>
            </React.Fragment>
        );

    it('renders correctly', () => {
        const { getByAltText, getByText } = renderSidebar();

        // Check if logo is rendered
        expect(getByAltText('Vidial_logo')).toBeTruthy();

        // Check if some of the menu items are rendered
        expect(getByText('Главная панель')).toBeTruthy();
        expect(getByText('Контент')).toBeTruthy();
        expect(getByText('Пользователи')).toBeTruthy();
        expect(getByText('Выйти')).toBeTruthy();
    });

    it('toggles content sub-items correctly', () => {
        const { getByText } = renderSidebar();

        // Click on "Контент" to expand
        fireEvent.click(getByText('Контент'));

        // Check if sub-items are rendered after expansion
        expect(getByText('Акции')).toBeTruthy();
        expect(getByText('Услуги')).toBeTruthy();
        expect(getByText('Товары')).toBeTruthy();
        expect(getByText('Филиалы')).toBeTruthy();
        expect(getByText('Доктора')).toBeTruthy();
    });
});
