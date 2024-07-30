import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Slide, ToastContainer, toast } from 'react-toastify';

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
    width: '900px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: '20px',
    padding: '20px 50px',
  },
  toastContainer: {
    width: 'auto',
  },
}));

const PromoNewFormPage = () => {
  const { classes } = useStyles();

  const notify = () => {
    toast.success(
      'Вы успешно добавили новую акцию! Вас автоматически перенаправят на страницу Акции',
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
        <Box className={classes.newFormBox}>
          <PromoNewForm notify={notify} />
        </Box>
      </Box>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className={classes.toastContainer}
      />
    </>
  );
};

export default PromoNewFormPage;
