import { Box } from '@mui/material';
import DefaultTheme from '../../theme/DefaultTheme';
import TopBar from './TopBar';

const PageContent: React.FC = () => {
  const colors = DefaultTheme.palette;

  return (
    <Box
      sx={{
        backgroundColor: colors.background.default,
        width: '100%',
        minHeight: '100vh',
        padding: '23px 45px',
      }}
    >
      <TopBar />
    </Box>
  );
};

export default PageContent;