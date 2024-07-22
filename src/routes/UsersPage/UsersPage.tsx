import { Box } from '@mui/material';

import PageContent from 'layouts/PageContent/PageContent';
import Sidebar from 'layouts/SidebarComponents/Sidebar';

const UsersPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Sidebar />
      <PageContent>
        <Box />
      </PageContent>
    </Box>
  );
};

export default UsersPage;
