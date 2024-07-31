import React from 'react';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';

import useGlobalStyles from 'theme/globalStyles';

interface WarningWindowProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  text: string;
}

const WarningWindowDelete: React.FC<WarningWindowProps> = (props) => {
  const globalClasses = useGlobalStyles();

  const handleConfirmAndClose = () => {
    props.handleConfirm();
    props.handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 800,
        },
      }}
    >
      <Fade in={props.open} timeout={{ enter: 300, exit: 900 }}>
        <Box className={globalClasses.classes.modalBox}>
          <Typography
            className={globalClasses.classes.modalText}
            id="transition-modal-title"
            component="h2"
          >
            {props.text}
          </Typography>
          <Box className={globalClasses.classes.modalBtns}>
            <Button
              className={globalClasses.classes.modalBtn}
              variant="contained"
              onClick={handleConfirmAndClose}
            >
              Да
            </Button>
            <Button
              className={globalClasses.classes.modalBtn}
              variant="contained"
              onClick={props.handleClose}
            >
              Нет
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default WarningWindowDelete;
