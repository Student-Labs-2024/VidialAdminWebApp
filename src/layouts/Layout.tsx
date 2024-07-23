import { Outlet } from 'react-router';
import { Box } from '@mui/material';

import PageContent from './PageContent/PageContent';
import Sidebar from './SidebarComponents/Sidebar';

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
