import React from 'react';
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router';

interface WarningWindowProps {
  open: boolean;
  handleClose: () => void;
  text: string;
}

const useStyles = makeStyles()((theme) => ({
  modalBox: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '611px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    padding: '71px 95px',
    borderRadius: '20px',
    textAlign: 'center',
  },
  modalText: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    marginBottom: '35px',
  },
  modalBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '29px',
  },
  modalBtn: {
    padding: '10px 0',
    fontSize: theme.typography.h2.fontSize,
  },
}));

const WarningWindow: React.FC<WarningWindowProps> = (props) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

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
      <Fade in={props.open}>
        <Box className={classes.modalBox}>
          <Typography
            className={classes.modalText}
            id="transition-modal-title"
            component="h2"
          >
            {props.text}
          </Typography>
          <Box className={classes.modalBtns}>
            <Button
              className={classes.modalBtn}
              variant="contained"
              onClick={() => navigate('/auth')}
            >
              Да
            </Button>
            <Button
              className={classes.modalBtn}
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

export default WarningWindow;
