import React from 'react';
import { Backdrop, Box, Fade, Modal } from '@mui/material';

import ServiceEditForm from 'forms/Service/ServiceEditForm';
import ServiceDataCardProps from 'types/Service/ServiceDataCardProps';

interface ServiceEditFormPageProps {
  open: boolean;
  handleClose: () => void;
  service: ServiceDataCardProps;
}

const ServiceEditFormPage: React.FC<ServiceEditFormPageProps> = ({
  open,
  handleClose,
  service,
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
          <ServiceEditForm handleClose={handleClose} service={service} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ServiceEditFormPage;
