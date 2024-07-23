import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import PageContentProps from 'types/PageContentProps';
import TopBar from './TopBar';

const useStyles = makeStyles()((theme) => ({
  pageContent: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    minHeight: '100vh',
    padding: '23px 45px',
  },
}));

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.pageContent}>
      <TopBar />
      {children}
    </Box>
  );
};

export default PageContent;
