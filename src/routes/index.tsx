import { createBrowserRouter } from 'react-router-dom';
import { Typography } from '@mui/material';

import AuthComponent from './AuthPage/AuthComponent';
import ErrorAuthComponent from './AuthPage/ErrorAuthComponent';
import MainPage from './MainPage/MainPage';
import PromosPage from './ContentPage/PromosPage/PromosPage';
import ServicesPage from './ContentPage/ServicesPage/ServicesPage';
import ItemPage from './ContentPage/ItemsPage/ItemsPage';
import DepartmentPage from './ContentPage/DepartmentsPage/DepartmentsPage';
import DoctorsPage from './ContentPage/DoctorsPage/DoctorsPage';
import UsersPage from './UsersPage/UsersPage';
import Layout from 'layouts/Layout';
import PromoNewFormPage from './ContentPage/PromosPage/PromoNewFormPage';
import PromoEditFormPage from './ContentPage/PromosPage/PromoEditFormPage';
import ErrorContentComponent from './ContentPage/components/ErrorContentComponent';

const Router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthComponent />,
    errorElement: <ErrorAuthComponent />,
  },
  {
    element: <Layout />,
    errorElement: <ErrorContentComponent />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/stocks',
        element: <PromosPage />,
      },
      {
        path: '/stocks/add',
        element: <PromoNewFormPage />,
      },
      {
        path: '/stocks/edit/:id',
        element: <PromoEditFormPage />,
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
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              fontSize: '50px',
            }}
          >
            Вы вышли!
          </Typography>
        ),
      },
    ],
  },
]);

export default Router;
