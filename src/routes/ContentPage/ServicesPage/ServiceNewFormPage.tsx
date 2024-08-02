import React from 'react';
import { Backdrop, Box, Fade, Modal } from '@mui/material';

import ServiceNewForm from 'forms/Service/ServiceNewForm';

interface ServiceNewFormPageProps {
  open: boolean;
  handleClose: () => void;
}

const ServiceNewFormPage: React.FC<ServiceNewFormPageProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open} timeout={{ enter: 300, exit: 300 }}>
        <Box id="transition-modal-title" className="modalBox">
          <ServiceNewForm handleClose={handleClose} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ServiceNewFormPage;
