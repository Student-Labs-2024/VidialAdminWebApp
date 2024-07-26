import { Box, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  errorBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '20px',
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    minHeight: '100Vh',
  },
  errorTitle: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
  },
  errorDesc: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h2.fontSize,
  },
}));

const ErrorContentComponent = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.errorBox}>
      <Box component="img" src="/img/cuate.svg" />
      <Typography className={classes.errorTitle}>
        Что-то пошло не так
      </Typography>
      <Typography className={classes.errorDesc}>
        Обновите страницу или повторите попытку позже
      </Typography>
    </Box>
  );
};

export default ErrorContentComponent;
