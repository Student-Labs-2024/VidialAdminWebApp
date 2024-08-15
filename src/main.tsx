import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Router from './routes';
import { DefaultTheme } from 'theme/DefaultTheme';
import GlobalStylesComponent from 'theme/globalStyles';
import Toast from 'components/Toast';

ReactDOM.createRoot(document.getElementById('admin-panel-vidial')!).render(
  <ThemeProvider theme={DefaultTheme}>
    <React.Fragment>
      <GlobalStylesComponent />
      <Toast />
      <CssBaseline />
      <RouterProvider router={Router} />
    </React.Fragment>
  </ThemeProvider>,
);
