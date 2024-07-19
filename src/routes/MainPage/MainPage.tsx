import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '../../layouts/SidebarComponents/Sidebar';
import PageContent from '../../layouts/PageContent/PageContent';

const MainPage: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      width: '100%'
    }}>
      <Sidebar />
      <PageContent />
    </Box>
  );
};

export default MainPage;
