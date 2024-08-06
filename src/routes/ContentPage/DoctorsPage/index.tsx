import { Add, ArrowRightAltOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { makeStyles } from 'tss-react/mui';
import { useEffect } from 'react';
import { Slide, toast } from 'react-toastify';

import InputSearch from 'components/InputSearch';
import doctorStore from 'stores/DoctorStore';
import { DoctorCardProps } from 'types/Doctor/DoctorCardProps';
import DoctorCardInfo from './DoctorCardInfo';

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
    height: 'auto',
  },

  doctorCardEditBtn: {
    width: '80%',
    padding: '7px 20px',
  },
}));

const DoctorsPage = () => {
  const { classes } = useStyles();
  // const navigate = useNavigate();

  const handleOpenDoctor = (doctor: DoctorCardProps) => {
    doctorStore.selectDoctor(doctor);
  };

  const handleCloseDoctor = () => {
    doctorStore.clearSelectedDoctor();
  };

  const handleConfirmDelete = () => {
    if (doctorStore.selectedDoctor) {
      doctorStore.deleteDoctor(doctorStore.selectedDoctor.id);
      doctorStore.saveDoctors();
      doctorStore.clearSelectedDoctor();
      toast.success('Доктор удален!', { transition: Slide });
    }
  };

  useEffect(() => {
    doctorStore.loadDoctors();
  }, []);

  return (
    <Box>
      <Box className="contentBtns">
        <InputSearch />
        <Tooltip title="Добавить доктора" placement="bottom">
          <IconButton sx={{ padding: 0 }}>
            <Add className="iconAdd" />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={3}>
        {doctorStore.doctors.map((doctor) => (
          <Grid item xs={12} sm={6} lg={4} key={doctor.id}>
            <Box className={classes.doctorCard}>
              <Avatar
                className={classes.doctorCardImg}
                src={doctor.portrait}
                alt={doctor.name}
              />
              <Typography className="doctorCardName">{doctor.name}</Typography>
              <Divider className="cardDivider" />
              <Typography className="doctorCardCategory">
                {doctor.category}
              </Typography>
              <Button
                onClick={() => handleOpenDoctor(doctor)}
                variant="text"
                endIcon={<ArrowRightAltOutlined />}
              >
                Подробнее
              </Button>
              <Button className={classes.doctorCardEditBtn} variant="contained">
                Редактировать
              </Button>
            </Box>
          </Grid>
        ))}
        {doctorStore.selectedDoctor && (
          <DoctorCardInfo
            open={Boolean(doctorStore.selectedDoctor)}
            handleClose={handleCloseDoctor}
            handleConfirmDelete={handleConfirmDelete}
            {...doctorStore.selectedDoctor}
          />
        )}
      </Grid>
    </Box>
  );
};

export default observer(DoctorsPage);
