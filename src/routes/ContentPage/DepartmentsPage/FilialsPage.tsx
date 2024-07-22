import { Box } from '@mui/material';
import Sidebar from '../../../layouts/SidebarComponents/Sidebar';
import PageContent from '../../../layouts/PageContent/PageContent';

const DepartmentPage = () => {
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

export default DepartmentPage;