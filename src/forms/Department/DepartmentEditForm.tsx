import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Backdrop,
  Fade,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite';
import { Slide, toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';
import departmentStore from 'stores/DepartmentStore';
import DepartmentCardProps from 'types/Department/DepartmentCardProps';

const useStyles = makeStyles()((theme) => ({
  modalBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    padding: '40px',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '15px',
  },
  previewBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    height: '400px',
    color: theme.palette.text.secondary,
    border: '1px solid',
  },
  input: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    width: '48%',
  },
}));

const validationSchema = yup.object({
  latitude: yup
    .number()
    .required('Введите широту')
    .min(-90, 'Минимум -90')
    .max(90, 'Максимум 90'),
  longitude: yup
    .number()
    .required('Введите долготу')
    .min(-180, 'Минимум -180')
    .max(180, 'Максимум 180'),
});

interface DepartmentEditFormProps {
  open: boolean;
  handleClose: () => void;
  department: DepartmentCardProps;
}

const DepartmentEditForm = ({
  open,
  handleClose,
  department,
}: DepartmentEditFormProps) => {
  const { classes } = useStyles();
  const [mapUrl, setMapUrl] = useState('');

  const formik = useFormik({
    initialValues: {
      latitude: department.latitude || '',
      longitude: department.longitude || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedDepartment = {
        ...department,
        latitude: values.latitude,
        longitude: values.longitude,
      };

      departmentStore.editDepartment(updatedDepartment);
      toast.success('Координаты обновлены!', {
        transition: Slide,
      });
      handleClose();
    },
  });

  useEffect(() => {
    if (formik.values.latitude && formik.values.longitude) {
      setMapUrl(
        `https://yandex.ru/map-widget/v1/?ll=${formik.values.longitude}%2C${formik.values.latitude}&z=16&pt=${formik.values.longitude},${formik.values.latitude},pm2rdm`,
      );
    } else {
      setMapUrl('');
    }
  }, [formik.values.latitude, formik.values.longitude]);

  useEffect(() => {
    if (!open) {
      formik.resetForm();
      setMapUrl('');
    }
  }, [open]);

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
        <Box id="transition-modal-title" className={classes.modalBox}>
          <form onSubmit={formik.handleSubmit} className={classes.formBox}>
            <TextField
              id="latitude"
              name="latitude"
              label="Широта"
              value={formik.values.latitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.latitude && Boolean(formik.errors.latitude)}
              helperText={
                formik.touched.latitude &&
                typeof formik.errors.latitude === 'string'
                  ? formik.errors.latitude
                  : ''
              }
              fullWidth
              variant="standard"
              className={classes.input}
            />
            <TextField
              id="longitude"
              name="longitude"
              label="Долгота"
              value={formik.values.longitude}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.longitude && Boolean(formik.errors.longitude)
              }
              helperText={
                formik.touched.longitude &&
                typeof formik.errors.longitude === 'string'
                  ? formik.errors.longitude
                  : ''
              }
              fullWidth
              variant="standard"
              className={classes.input}
            />
            <Box className={classes.buttonContainer}>
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
              >
                Сохранить
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleClose}
              >
                Отмена
              </Button>
            </Box>
          </form>
          <Box className={classes.previewBox}>
            <Typography variant="h6">Предпросмотр координат:</Typography>
            {mapUrl ? (
              <iframe
                src={mapUrl}
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                style={{ borderRadius: '10px' }}
              ></iframe>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Введите координаты для отображения карты
              </Typography>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default observer(DepartmentEditForm);
