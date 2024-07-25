// src/forms/Promo/PromoNewForm.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import promoStore from 'stores/PromoStore';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';

const validationSchema = yup.object({
  img: yup.string().required('Загрузите изображение акции'),
  title: yup.string().required('Требуется название акции'),
  description: yup.string().required('Требуется описание акции'),
  fullDescription: yup.string().required('Требуется подробное описание'),
  startDate: yup.date().required('Требуется дата начала акции'),
  endDate: yup.date().required('Требуется дата конца акции'),
});

const useStyles = makeStyles()((theme) => ({
  modalBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: '10px',
  },
  modalBtn: {
    fontSize: theme.typography.h3.fontSize,
    width: '100%',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
  },
  formInputs: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
  },
  uploadButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '350px',
  },
  uploadButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  uploadButtonStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: `1px solid ${theme.palette.grey[600]}`,
    padding: '10px',
  },
  uploadBtnText: {
    color: theme.palette.grey[600],
    fontSize: '14px',
    fontWeight: theme.typography.h2.fontWeight,
  },
  uploadBtnWarning: {
    textAlign: 'center',
    color: theme.palette.grey[600],
  },
  uploadTextError: {
    textAlign: 'center',
    fontSize: '14px',
    color: theme.palette.primary.main,
  },
  uploadBtnImgName: {
    color: theme.palette.text.secondary,
    fontSize: '10px',
  },
  uploadedImageContainer: {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    padding: '10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  uploadedImage: {
    borderRadius: '20px',
  },
  deleteButton: {
    color: theme.palette.text.primary,
  },
}));

const PromoNewForm = observer(() => {
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>('');
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setImageError('Только файлы JPG и PNG допустимы');
        return;
      }
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== 1024 || img.height !== 1024) {
          setImageError('Рекомендуемый размер изображения: 1024x1024');
        } else {
          setImage(file);
          setImageURL(img.src);
          setImageError('');
          formik.setFieldValue('img', img.src);
        }
      };
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setImageURL(null);
    formik.setFieldValue('img', '');
  };

  const formik = useFormik({
    initialValues: {
      img: '',
      title: '',
      description: '',
      fullDescription: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!image) {
        setImageError('Изображение акции обязательно');
        return;
      }

      const newPromo: PromoDataCardProps = {
        id: Date.now(),
        img: values.img,
        title: values.title,
        description: values.description,
        fullDescription: values.fullDescription,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
      };

      promoStore.addPromo(newPromo);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/stocks');
      }, 3000);
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap="10px">
        <Box className={classes.formContainer}>
          <Box className={classes.formInputs}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Название акции"
              placeholder="Введите название акции"
              variant="standard"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Описание акции"
              placeholder="Введите описание акции"
              variant="standard"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              fullWidth
              id="fullDescription"
              name="fullDescription"
              label="Подробное описание"
              placeholder="Введите подробное описание акции"
              variant="standard"
              multiline
              rows={4}
              value={formik.values.fullDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fullDescription &&
                Boolean(formik.errors.fullDescription)
              }
              helperText={
                formik.touched.fullDescription && formik.errors.fullDescription
              }
            />
            <TextField
              fullWidth
              id="startDate"
              name="startDate"
              label="Дата начала акции"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              helperText={formik.touched.startDate && formik.errors.startDate}
            />
            <TextField
              fullWidth
              id="endDate"
              name="endDate"
              label="Дата конца акции"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />
            <Box className={classes.modalBtns}>
              <Button
                className={classes.modalBtn}
                variant="contained"
                type="submit"
                disabled={!formik.isValid || !formik.dirty || !imageURL}
              >
                Сохранить
              </Button>
              <Button
                className={classes.modalBtn}
                variant="contained"
                onClick={() => navigate('/stocks')}
              >
                Отмена
              </Button>
            </Box>
          </Box>
          <Box className={classes.uploadButtonContainer}>
            {!imageURL ? (
              <>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-image"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="upload-image" className={classes.uploadButton}>
                  <Button
                    className={classes.uploadButtonStyle}
                    component="span"
                  >
                    <Box component="img" src="/img/upload.svg" alt="upload" />
                    <Typography
                      className={classes.uploadBtnText}
                      variant="body2"
                    >
                      Загрузите новое фото акции
                    </Typography>
                  </Button>
                </label>
                {imageError && (
                  <Typography className={classes.uploadTextError}>
                    {imageError}
                  </Typography>
                )}
              </>
            ) : (
              <Box className={classes.uploadedImageContainer}>
                <Box
                  className={classes.uploadedImage}
                  component="img"
                  src={imageURL}
                  alt="uploaded"
                  width="100%"
                />
                <Button
                  className={classes.deleteButton}
                  onClick={handleImageDelete}
                  variant="contained"
                >
                  Удалить
                </Button>
              </Box>
            )}
            <Typography
              className={classes.uploadBtnWarning}
              variant="body2"
              color="red"
            >
              *Форматы изображений: jpg, png. Рекомендуемый размер: 1024x1024.
            </Typography>
            {formik.errors.img && (
              <Typography color="error" className={classes.uploadTextError}>
                {formik.errors.img}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="success"
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
        >
          Вы добавили новую карточку! Вас автоматически перенаправят на страницу
          Акции
        </Alert>
      </Snackbar>
    </form>
  );
});

export default PromoNewForm;
