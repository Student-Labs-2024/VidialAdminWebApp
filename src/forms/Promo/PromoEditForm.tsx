import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import promoStore from 'stores/PromoStore';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import { Slide, toast } from 'react-toastify';

const validationSchema = yup.object({
  img: yup.string().required('Загрузите изображение акции'),
  title: yup.string().required('Требуется название акции'),
  description: yup.string().required('Требуется описание акции'),
  fullDescription: yup.string().required('Требуется подробное описание'),
  startDate: yup.date().required('Требуется дата начала акции'),
  endDate: yup.date().required('Требуется дата конца акции'),
});

const PromoEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const promoId = Number(id);
  const promo = promoStore.getPromoById(promoId);
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>('');
  const [imageURL, setImageURL] = useState<string | null>(promo?.img || null);

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
          setImageURL(URL.createObjectURL(file));
          setImageError('');
          formik.setFieldValue('img', URL.createObjectURL(file));
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
      img: promo?.img || '',
      title: promo?.title || '',
      description: promo?.description || '',
      fullDescription: promo?.fullDescription || '',
      startDate: promo?.startDate
        ? new Date(promo.startDate).toISOString().split('T')[0]
        : '',
      endDate: promo?.endDate
        ? new Date(promo.endDate).toISOString().split('T')[0]
        : '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!image && !imageURL) {
        setImageError('Изображение акции обязательно');

        return;
      }

      const updatedPromo: PromoDataCardProps = {
        id: promoId,
        img: values.img,
        title: values.title,
        description: values.description,
        fullDescription: values.fullDescription,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
      };

      promoStore.editPromo(updatedPromo);
      setTimeout(() => {
        navigate('/stocks');
      }, 2000);
      toast.success('Акция отредактирована!', {
        transition: Slide,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap="10px">
        <Box className="formContainer">
          <Box className="formInputs">
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
            <Box className="modalBtns">
              <Button
                className="modalBtn"
                variant="contained"
                type="submit"
                disabled={!formik.isValid || !formik.dirty || !imageURL}
              >
                Сохранить
              </Button>
              <Button
                className="modalBtn"
                variant="contained"
                onClick={() => navigate('/stocks')}
              >
                Отмена
              </Button>
            </Box>
          </Box>
          <Box className="uploadButtonContainer">
            {!imageURL ? (
              <>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-image"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="upload-image" className="uploadButton">
                  <Button className="uploadButtonStyle" component="span">
                    <Box component="img" src="/img/upload.svg" alt="upload" />
                    <Typography className="uploadBtnText" variant="body2">
                      Загрузите новое фото акции
                    </Typography>
                  </Button>
                </label>
                {imageError && (
                  <Typography className="uploadTextError">
                    {imageError}
                  </Typography>
                )}
              </>
            ) : (
              <Box className="uploadedImageContainer">
                <Box
                  className="uploadedImage"
                  component="img"
                  src={imageURL}
                  alt="uploaded"
                  width="100%"
                />
                <Button
                  className="deleteButton"
                  onClick={handleImageDelete}
                  variant="contained"
                >
                  Удалить
                </Button>
              </Box>
            )}
            <Typography
              className="uploadBtnWarning"
              variant="body2"
              color="red"
            >
              *Форматы изображений: jpg, png. Рекомендуемый размер: 1024x1024.
            </Typography>
            {formik.errors.img && (
              <Typography color="error" className="uploadTextError">
                {String(formik.errors.img)}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default observer(PromoEditForm);
