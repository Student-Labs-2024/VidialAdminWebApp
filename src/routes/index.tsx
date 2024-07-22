import { createBrowserRouter } from 'react-router-dom';
import { Typography } from '@mui/material';

import AuthComponent from './AuthPage/AuthComponent';
import ErrorAuthComponent from './AuthPage/ErrorAuthComponent';
import MainPage from './MainPage/MainPage';
import StocksPage from './ContentPage/StocksPage/StocksPage';
import ServicesPage from './ContentPage/ServicesPage/ServicesPage';
import ItemPage from './ContentPage/ItemsPage/ItemsPage';
import DepartmentPage from './ContentPage/DepartmentsPage/FilialsPage';
import DoctorsPage from './ContentPage/DoctorsPage/DoctorsPage';
import UsersPage from './UsersPage/UsersPage';

const Router = createBrowserRouter([
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
    element: <DepartmentPage />,
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
  {
    path: '/auth',
    element: <AuthComponent />,
    errorElement: <ErrorAuthComponent />,
  },
]);

export default Router;
