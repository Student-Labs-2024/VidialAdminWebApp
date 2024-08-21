import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import PromoNewForm from 'forms/Promo/PromoNewForm';

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  newFormBox: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: '20px',
    padding: '20px 50px',
  },
}));

const PromoNewFormPage = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.newFormBox}>
        <PromoNewForm />
      </Box>
    </Box>
  );
};

export default PromoNewFormPage;
