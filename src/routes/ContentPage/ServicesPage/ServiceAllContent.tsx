import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import ServiceDataCardProps from 'types/Service/ServiceDataCardProps';
import Toast from 'components/Toast';
import serviceStore from 'stores/ServiceStore';

const ServiceAllContent = () => {
  const [services, setServices] = useState<ServiceDataCardProps[]>([]);

  useEffect(() => {
    serviceStore.loadServices();
    setServices(serviceStore.services);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} lg={12} key={service.id}>
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
                <Button className="serviceCardEditBtn" variant="contained">
                  Редактировать
                </Button>
                <Button className="serviceCardEditBtn" variant="contained">
                  Удалить
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Toast />
    </>
  );
};

export default ServiceAllContent;
