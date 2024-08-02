import { Add } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Slide, toast } from 'react-toastify';

import InputSearch from 'components/InputSearch';
import MenuFilterBtn from 'components/MenuFilterBtn';
import ServiceNewFormPage from './ServiceNewFormPage';

const ServicesPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const notify = () => {
    toast.success('Услуга успешно добавлена!', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  };

  return (
    <Box className="root">
      <Box className="contentBtns">
        <InputSearch />
        <Tooltip title="Добавить услугу" placement="bottom">
          <IconButton sx={{ padding: 0 }} onClick={handleOpenModal}>
            <Add className="iconAdd" />
          </IconButton>
        </Tooltip>
        <MenuFilterBtn />
      </Box>
      <ServiceNewFormPage
        open={openModal}
        handleClose={handleCloseModal}
        notify={notify}
      />
    </Box>
  );
};

export default ServicesPage;
