import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import authStore from 'stores/AuthStore';
import useGlobalStyles from 'theme/globalStyles';

interface WarningWindowProps {
  open: boolean;
  handleClose: () => void;
  text: string;
}

const WarningWindow = ({ open, handleClose, text }: WarningWindowProps) => {
  const navigate = useNavigate();
  const globalClasses = useGlobalStyles();

  const handleSubmit = () => {
    authStore.logout();
    navigate('/auth');
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 800,
        },
      }}
    >
      <Fade in={open}>
        <Box className={globalClasses.classes.modalBox}>
          <Typography
            className={globalClasses.classes.modalText}
            id="transition-modal-title"
            component="h2"
          >
            {text}
          </Typography>
          <Box className={globalClasses.classes.modalBtns}>
            <Button
              className={globalClasses.classes.modalBtn}
              variant="contained"
              onClick={handleSubmit}
            >
              Да
            </Button>
            <Button
              className={globalClasses.classes.modalBtn}
              variant="contained"
              onClick={handleClose}
            >
              Нет
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default WarningWindow;
