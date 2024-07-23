import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import authStore from 'stores/AuthStore';

const PrivateRoute: React.FC = observer(() => {
  return authStore.isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
});

export default PrivateRoute;
