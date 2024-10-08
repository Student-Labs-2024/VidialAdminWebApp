import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  toastContainer: {
    width: 'auto',
  },
});

const Toast = () => {
  const { classes } = useStyles();

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="colored"
      className={classes.toastContainer}
    />
  );
};

export default Toast;
