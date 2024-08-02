import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Slide, toast } from 'react-toastify';

import Toast from 'components/Toast';
import serviceStore from 'stores/ServiceStore';
import ServiceDataCardProps from 'types/Service/ServiceDataCardProps';
import WarningWindowDelete from 'components/WarningWindowDelete';
import ServiceEditFormPage from './ServiceEditFormPage';

const ServiceAllContent = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedService, setSelectedService] =
    useState<ServiceDataCardProps | null>(null);
  const [services, setServices] = useState<ServiceDataCardProps[]>([]);

  useEffect(() => {
    serviceStore.loadServices();
    setServices(serviceStore.services);
  }, []);

  const handleOpenDeleteWindow = (service: ServiceDataCardProps) => {
    setSelectedService(service);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteWindow = () => {
    setOpenDeleteModal(false);
    setSelectedService(null);
  };

  const handleOpenEditWindow = (service: ServiceDataCardProps) => {
    setSelectedService(service);
    setOpenEditModal(true);
  };

  const handleCloseEditWindow = () => {
    setOpenEditModal(false);
    setSelectedService(null);
  };

  const notifyDelete = () => {
    toast.success('Вы удалили услугу!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  };

  const notifyEdit = () => {
    toast.success('Услуга отредактирована!', {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  };

  const handleConfirmDelete = async () => {
    if (selectedService) {
      await serviceStore.deleteService(selectedService.id);
      setServices(serviceStore.services);
      setOpenDeleteModal(false);
      notifyDelete();
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={12} lg={12} key={service.id}>
            <Box className="serviceCard">
              <Box className="serviceCardTitleAndDesc">
                <Typography className="serviceCardTitle">
                  {service.title}
                </Typography>
                <Typography className="serviceCardDescription">
                  {service.description}
                </Typography>
                {service.countProcedures > 0 && (
                  <Typography className="serviceCardDescription">
                    {`${service.countProcedures} процедур`}
                  </Typography>
                )}
              </Box>
              <Typography className="serviceCardPrice">
                {`${service.price} ₽`}
              </Typography>
              <Box className="serviceBtnsContainer">
                <Button
                  className="serviceCardEditBtn"
                  variant="contained"
                  onClick={() => handleOpenEditWindow(service)}
                >
                  Редактировать
                </Button>
                <Button
                  className="serviceCardEditBtn"
                  variant="contained"
                  onClick={() => handleOpenDeleteWindow(service)}
                >
                  Удалить
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <WarningWindowDelete
        open={openDeleteModal}
        handleClose={handleCloseDeleteWindow}
        handleConfirm={handleConfirmDelete}
        text="Вы действительно хотите удалить данную услугу?"
      />
      {selectedService && (
        <ServiceEditFormPage
          open={openEditModal}
          handleClose={handleCloseEditWindow}
          notify={notifyEdit}
          service={selectedService}
        />
      )}
      <Toast />
    </>
  );
};

export default observer(ServiceAllContent);
