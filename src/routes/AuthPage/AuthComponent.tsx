import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import AuthForm from 'forms/AuthForm';

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
    textAlign: 'center',
    padding: '76px 64px',
    width: '50%',
  },
  authSignInTitle: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.h1.fontWeight,
    fontSize: theme.typography.h1.fontSize,
    marginBottom: '25px',
  },
}));

const AuthComponent = () => {
  const { classes } = useStyles();

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
          <Typography className={classes.authSignInTitle}>Вход</Typography>
          <AuthForm />
        </Box>
      </Box>
    </Container>
  );
};

export default AuthComponent;
