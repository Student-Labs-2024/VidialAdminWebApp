import { Box, Button, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import serviceStore from 'stores/ServiceStore';

const ServiceHardwareTreatmentContent = () => {
  const location = useLocation();

  const tag = location.pathname.split('/').pop();
  const filteredServices = serviceStore.services.filter(
    (service) => service.tag === tag,
  );

  return (
    <>
      <Grid container spacing={3}>
        {filteredServices.map((service) => (
          <Grid item xs={12} sm={6} lg={12} key={service.id}>
            <Box className="serviceCard">
              <Box className="serviceCardTitleAndDesc">
                <Typography className="serviceCardTitle">
                  {service.title}
                </Typography>
                <Typography className="serviceCardDescription">
                  {`${service.countProcedures} процедур`}
                </Typography>
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
    </>
  );
};

export default ServiceHardwareTreatmentContent;
