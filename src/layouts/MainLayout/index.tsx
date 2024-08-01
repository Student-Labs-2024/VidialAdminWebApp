import { Outlet } from 'react-router';
import { Box } from '@mui/material';

import PageContent from './PageContent';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Sidebar />
      <PageContent>
        <Outlet />
      </PageContent>
    </Box>
  );
};
export default Layout;
