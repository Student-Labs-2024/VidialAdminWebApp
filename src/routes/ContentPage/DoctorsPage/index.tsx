import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { makeStyles } from 'tss-react/mui';

import doctorStore from 'stores/DoctorStore';
import { DoctorCardProps } from 'types/Doctor/DoctorCardProps';
import WarningWindowDelete from 'components/WarningWindowDelete';
import DoctorNewForm from 'forms/Doctor/DoctorNewForm';
import DoctorEditForm from 'forms/Doctor/DoctorEditForm';
import ErrorContentComponent from 'components/ErrorContentComponent';

const useStyles = makeStyles()((theme) => ({
  doctorCard: {
    padding: '30px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: '20px',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  doctorCardImg: {
    width: '90%',
    height: '250px',
  },

  doctorCardEditBtn: {
    width: '80%',
    padding: '7px 20px',
  },
}));

const DoctorsPage = () => {
  const { classes } = useStyles();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openAddPhotoModal, setOpenAddPhotoModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const { selectedDoctor, doctors, error, isLoading } = doctorStore;

  const handleConfirmDelete = () => {
    if (selectedDoctor) {
      doctorStore.deleteDoctorImg(selectedDoctor.id!);
      doctorStore.clearSelectedDoctor();
    }
    setOpenModalDelete(false);
  };

  const handleOpenModalDelete = (doctor: DoctorCardProps) => {
    doctorStore.selectDoctor(doctor);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenModalEdit = (doctor: DoctorCardProps) => {
    doctorStore.selectDoctor(doctor);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    doctorStore.clearSelectedDoctor();
  };

  const handleOpenAddPhotoModal = (doctor: DoctorCardProps) => {
    doctorStore.selectDoctor(doctor);
    setOpenAddPhotoModal(true);
  };

  const handleCloseAddPhotoModal = () => {
    setOpenAddPhotoModal(false);
    doctorStore.clearSelectedDoctor();
  };

  useEffect(() => {
    doctorStore.loadDoctors();
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        {error && (
          <Grid item xs={12}>
            <ErrorContentComponent />
          </Grid>
        )}
        {isLoading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Box className={classes.doctorCard}>
                  <Skeleton
                    variant="rectangular"
                    className={classes.doctorCardImg}
                    sx={{ bgcolor: 'grey.300', borderRadius: '200px' }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: 'grey.300', width: '80%' }}
                  />
                  <Divider />
                  <Skeleton
                    variant="text"
                    sx={{ bgcolor: 'grey.300', width: '60%' }}
                  />
                  <Skeleton
                    variant="text"
                    height={64}
                    width="80%"
                    sx={{ bgcolor: 'grey.300' }}
                  />
                </Box>
              </Grid>
            ))
          : doctors.map((doctor) => (
              <Grid item xs={12} sm={6} lg={4} key={doctor.id}>
                <Box className={classes.doctorCard}>
                  <Avatar
                    className={classes.doctorCardImg}
                    src={doctor.portrait}
                    alt={doctor.name}
                  />
                  <Typography className="doctorCardName">
                    {doctor.name}
                  </Typography>
                  <Divider className="cardDivider" />
                  <Typography className="doctorCardCategory">
                    {doctor.category}
                  </Typography>
                  {doctor.portrait ? (
                    <>
                      <Button
                        className={classes.doctorCardEditBtn}
                        variant="contained"
                        onClick={() => handleOpenModalEdit(doctor)}
                      >
                        Редактировать
                      </Button>
                      <Button
                        className={classes.doctorCardEditBtn}
                        variant="contained"
                        onClick={() => handleOpenModalDelete(doctor)}
                      >
                        Удалить фото
                      </Button>
                    </>
                  ) : (
                    <Button
                      className={classes.doctorCardEditBtn}
                      variant="contained"
                      onClick={() => handleOpenAddPhotoModal(doctor)}
                    >
                      Добавить фото
                    </Button>
                  )}
                </Box>
              </Grid>
            ))}
        <WarningWindowDelete
          open={openModalDelete}
          handleClose={handleCloseModalDelete}
          handleConfirm={handleConfirmDelete}
          text="Вы действительно хотите удалить фото данного доктора?"
        />
        <DoctorNewForm
          open={openAddPhotoModal}
          handleClose={handleCloseAddPhotoModal}
        />
        {selectedDoctor && (
          <DoctorEditForm
            open={openModalEdit}
            handleClose={handleCloseModalEdit}
            doctor={selectedDoctor!}
          />
        )}
      </Grid>
    </Box>
  );
};

export default observer(DoctorsPage);
