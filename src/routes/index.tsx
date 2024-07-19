import { createBrowserRouter } from 'react-router-dom';
import AuthComponent from './AuthPage/AuthComponent';
import ErrorAuthComponent from './AuthPage/ErrorAuthComponent';
import MainPage from './MainPage/MainPage';

const Router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthComponent />,
    errorElement: <ErrorAuthComponent />,
  },
  {
    path: '/',
    element: <MainPage />,
  },
]);

export default Router;
