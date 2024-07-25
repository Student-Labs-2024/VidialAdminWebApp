import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import PromoEditForm from 'forms/Promo/PromoEditForm';

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  editFormBox: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '900px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: '20px',
    padding: '20px 50px',
  },
}));

const PromoEditFormPage = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.editFormBox}>
        <PromoEditForm />
      </Box>
    </Box>
  );
};

export default PromoEditFormPage;
