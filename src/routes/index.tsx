import { createBrowserRouter } from 'react-router-dom';

import AuthComponent from './AuthPage/AuthComponent';
import ErrorAuthComponent from './AuthPage/ErrorAuthComponent';
import MainPage from './MainPage/MainPage';
import ServicesPage from './ContentPage/ServicesPage/ServicesPage';
import ItemPage from './ContentPage/ItemsPage/ItemsPage';
import DepartmentPage from './ContentPage/DepartmentsPage/DepartmentsPage';
import DoctorsPage from './ContentPage/DoctorsPage/DoctorsPage';
import UsersPage from './UsersPage/UsersPage';
import Layout from 'layouts/Layout';
import PromosPage from './ContentPage/PromosPage/PromosPage';
import ErrorContentComponent from '../components/ErrorContentComponent';
import PrivateRoute from './PrivateRoute';

const Router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthComponent />,
    errorElement: <ErrorAuthComponent />,
  },
  {
    element: <PrivateRoute />,
    children: [
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
        ],
      },
    ],
  },
]);

export default Router;
