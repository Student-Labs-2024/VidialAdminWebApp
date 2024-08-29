import React from 'react';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';

interface WarningWindowProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  text: string;
}

const WarningWindowDelete: React.FC<WarningWindowProps> = ({
  open,
  handleClose,
  handleConfirm,
  text,
}) => {
  const handleConfirmAndClose = () => {
    handleConfirm();
    handleClose();
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
      <Fade in={open} timeout={{ enter: 300, exit: 300 }}>
        <Box className="modalBox">
          <Typography className="modalText" id="transition-modal-title">
            {text}
          </Typography>
          <Box className="modalBtns">
            <Button
              className="modalBtn"
              variant="contained"
              onClick={handleConfirmAndClose}
            >
              Да
            </Button>
            <Button
              className="modalBtn"
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

export default WarningWindowDelete;
