import { observer } from 'mobx-react-lite';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import AuthComponent from './AuthPage/AuthComponent';
import ErrorAuthComponent from './AuthPage/ErrorAuthComponent';
import MainPage from './MainPage/MainPage';
import ItemPage from './ContentPage/ItemsPage';
import DepartmentPage from './ContentPage/DepartmentsPage/DepartmentsPage';
import DoctorsPage from './ContentPage/DoctorsPage/DoctorsPage';
import UsersPage from './UsersPage/UsersPage';
import Layout from 'layouts/MainLayout';
import PromosPage from './ContentPage/PromosPage';
import PromoNewFormPage from './ContentPage/PromosPage/PromoNewFormPage';
import PromoEditFormPage from './ContentPage/PromosPage/PromoEditFormPage';

import authStore from 'stores/AuthStore';

import ErrorContentComponent from 'components/ErrorContentComponent';
import ServiceAllContent from './ContentPage/ServicesPage/ServiceAllContent';
import ServiceDiagnosisTreatmentContent from './ContentPage/ServicesPage/ServiceDiagnosisTreatmentContent';
import ServiceHardwareTreatmentContent from './ContentPage/ServicesPage/ServiceHardwareTreatmentContent';
import ServiceLayout from 'layouts/ServiceLayout/ServiceLayout';

const PrivateRoute: React.FC = observer(() => {
  return authStore.isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
});

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
            path: '/stocks/add',
            element: <PromoNewFormPage />,
          },
          {
            path: '/stocks/edit/:id',
            element: <PromoEditFormPage />,
          },
          {
            element: <ServiceLayout />,
            children: [
              {
                path: '/services/',
                element: <ServiceAllContent />,
              },
              {
                path: '/services/DT',
                element: <ServiceDiagnosisTreatmentContent />,
              },
              {
                path: '/services/HT',
                element: <ServiceHardwareTreatmentContent />,
              },
            ],
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
