import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainPage from './MainPage/MainPage';
import { Typography } from '@mui/material';
import StocksPage from './ContentPage/StocksPage/StocksPage';
import ServicesPage from './ContentPage/ServicesPage/ServicesPage';
import ItemPage from './ContentPage/ItemsPage/ItemsPage';
import FilialsPage from './ContentPage/FilialsPage/FilialsPage';
import DoctorsPage from './ContentPage/DoctorsPage/DoctorsPage';
import UsersPage from './UsersPage/UsersPage';

const Router = createBrowserRouter([
    {
        path: '/auth',
    },
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/stocks',
        element: <StocksPage />,
    },
    {
        path: '/services',
        element: <ServicesPage />,
    },
    {
        path: '/items',
        element: <ItemPage />,
    },
    {
        path: '/filials',
        element: <FilialsPage />,
    },
    {
        path: '/doctors',
        element: <DoctorsPage />,
    },
    {
        path: '/users',
        element: <UsersPage />,
    },
    {
        path: '/logout',
        element: (
            <Typography
                sx={{ textAlign: 'center', color: 'text.secondary', fontSize: '50px' }}
            >
                Вы вышли!
            </Typography>
        ),
    },
]);

export default Router;
