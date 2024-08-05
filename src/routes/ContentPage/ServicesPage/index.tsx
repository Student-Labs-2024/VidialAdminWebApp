import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Slide, toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';

import InputSearch from 'components/InputSearch';
import MenuFilterBtn from 'routes/ContentPage/ServicesPage/MenuFilterBtn';
import ServiceNewFormPage from './ServiceNewFormPage';
import WarningWindowDelete from 'components/WarningWindowDelete';
import ServiceEditFormPage from './ServiceEditFormPage';
import ServiceDataCardProps from 'types/Service/ServiceDataCardProps';
import serviceStore from 'stores/ServiceStore';

const ServicesPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedService, setSelectedService] =
    useState<ServiceDataCardProps | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    serviceStore.loadServices();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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

  const handleConfirmDelete = () => {
    if (selectedService) {
      serviceStore.deleteService(selectedService.id);
      serviceStore.saveServices();
      setSelectedService(null);
      toast.success('Услуга удалена!', { transition: Slide });
    }
  };

  const handleFilterChange = (newFilter: string | null) => {
    setFilter(newFilter);
  };

  const filteredServices = filter
    ? serviceStore.services.filter((service) => service.tag === filter)
    : serviceStore.services;

  return (
    <Box className="root">
      <Box className="contentBtns">
        <InputSearch />
        <Tooltip title="Добавить услугу" placement="bottom">
          <IconButton sx={{ padding: 0 }} onClick={handleOpenModal}>
            <Add className="iconAdd" />
          </IconButton>
        </Tooltip>
        <MenuFilterBtn onFilterChange={handleFilterChange} />
      </Box>
      <ServiceNewFormPage open={openModal} handleClose={handleCloseModal} />
      <Grid container spacing={3}>
        {filteredServices.map((service) => (
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
          service={selectedService}
        />
      )}
    </Box>
  );
};

export default observer(ServicesPage);
