import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import ComponentsTheme from './theme/DefaultTheme';
import Router from './routes';


ReactDOM.createRoot(document.getElementById('admin-panel-vidial')!).render(
  <ThemeProvider theme={ComponentsTheme}>
    <React.StrictMode>
      <CssBaseline />
      <RouterProvider router={Router} />
    </React.StrictMode>
  </ThemeProvider>
)
