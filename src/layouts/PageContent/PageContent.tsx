import { Box } from '@mui/material';
import DefaultTheme from '../../theme/DefaultTheme';
import TopBar from './TopBar';
import PageContentProps from '../../types/PageContentProps';

const PageContent: React.FC<PageContentProps> = ({ children }) => {
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
      {children}
    </Box>
  );
};

export default PageContent;
