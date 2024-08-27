import { Box, Container, Tabs, Tab } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useState, useEffect } from 'react';
import { Slide, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import AuthLoginForm from 'forms/Authorization/AuthLoginForm';
import AuthRegisterForm from 'forms/Authorization/AuthRegisterForm';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: 730,
    height: 'auto',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '6px 4px 4px 0px rgba(0, 0, 0, 0.10)',
  },
  authWindow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '26px',
    padding: '55px',
    width: '50%',
    backgroundColor: theme.palette.grey[600],
  },
  logo: {
    maxWidth: '199px',
    width: '100%',
    height: 'auto',
  },
  picture: {
    width: '100%',
    height: 'auto',
  },
  authSignInPart: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '76px 64px',
    width: '50%',
  },
  authTabs: {
    marginBottom: '15px',
  },
}));

const AuthComponent = () => {
  const { classes } = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const showSnackbar = queryParams.get('showSnackbar');

    if (showSnackbar === 'true') {
      toast.error('Истекло время авторизации!', { transition: Slide });
    }
  }, [location.search]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const showSnackbar = localStorage.getItem('showAuthTimeoutSnackbar');

    if (showSnackbar === 'true') {
      toast.error('Истекло время авторизации!', { transition: Slide });

      localStorage.removeItem('showAuthTimeoutSnackbar');
    }
  }, []);

  return (
    <Container className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.authWindow}>
          <Box
            className={classes.logo}
            component="img"
            alt="Vidial_logo"
            src="img/logo.svg"
          />
          <Box
            className={classes.picture}
            component="img"
            alt="Vidial_picture"
            src="img/bro.svg"
          />
        </Box>
        <Box className={classes.authSignInPart}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            className={classes.authTabs}
          >
            <Tab label="Вход" />
            <Tab label="Регистрация" />
          </Tabs>
          {tabValue === 0 && <AuthLoginForm />}
          {tabValue === 1 && <AuthRegisterForm />}
        </Box>
      </Box>
    </Container>
  );
};

export default AuthComponent;
