import { Outlet } from 'react-router-dom';

import ServicesPage from 'routes/ContentPage/ServicesPage';

const ServiceLayout = () => {
  return (
    <>
      <ServicesPage />
      <Outlet />
    </>
  );
};

export default ServiceLayout;
