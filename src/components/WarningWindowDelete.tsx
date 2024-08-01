import React from 'react';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';

interface WarningWindowProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  text: string;
}

const WarningWindowDelete: React.FC<WarningWindowProps> = (props) => {
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
        <Box className="modalBox">
          <Typography className="modalText" id="transition-modal-title">
            {props.text}
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
