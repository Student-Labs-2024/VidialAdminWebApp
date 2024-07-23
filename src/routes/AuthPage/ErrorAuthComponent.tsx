import { Box, Container, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: theme.palette.background.default,
  },
  infoBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.main,
    width: '400px',
    height: '200px',
    borderRadius: '20px',
  },
  boxTypography: {
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    fontSize: '50px',
  },
}));

const ErrorAuthComponent = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Box className={classes.infoBox}>
        <Typography className={classes.boxTypography}>Ошибка 404</Typography>
      </Box>
    </Container>
  );
};

export default ErrorAuthComponent;
