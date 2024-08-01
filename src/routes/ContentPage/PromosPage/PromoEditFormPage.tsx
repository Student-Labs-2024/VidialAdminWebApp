import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Slide, toast } from 'react-toastify';

import PromoEditForm from 'forms/Promo/PromoEditForm';
import Toast from 'components/Toast';

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

  const notify = () => {
    toast.success(
      'Вы успешно редактировали данную акцию! Вас автоматически перенаправят на страницу Акции',
      {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      },
    );
  };

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.editFormBox}>
          <PromoEditForm notify={notify} />
        </Box>
      </Box>
      <Toast />
    </>
  );
};

export default PromoEditFormPage;
