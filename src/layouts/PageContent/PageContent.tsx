import { Box } from '@mui/material';

import PageContentProps from 'types/PageContentProps';
import { colors } from 'theme/DefaultTheme';
import TopBar from './TopBar';

const PageContent: React.FC<PageContentProps> = ({ children }) => {
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
