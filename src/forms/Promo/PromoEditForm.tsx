import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import promoStore from 'stores/PromoStore';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';

const validationSchema = yup.object({
  img: yup.string().required('Загрузите изображение акции'),
  title: yup.string().required('Требуется название акции'),
  description: yup.string().required('Требуется описание акции'),
  link: yup.string().required('Требуется ссылка на акцию'),
  start_date: yup.date().required('Требуется дата начала акции'),
  end_date: yup.date().required('Требуется дата конца акции'),
});

const PromoEditForm = () => {
  const { id } = useParams<{ id: string }>();
  const promoId = Number(id);
  const promo = promoStore.getPromoById(promoId);
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>('');
  const [imageURL, setImageURL] = useState<string | null>(promo?.photo || null);
  const { isLoading } = promoStore;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

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
  };

  const handleImageDelete = () => {
    setImage(null);
    setImageURL(null);
    formik.setFieldValue('img', '');
  };

  const formik = useFormik({
    initialValues: {
      img: promo?.link || '',
      title: promo?.title || '',
      description: promo?.description || '',
      link: promo?.link || '',
      start_date: promo?.start_date ? promo.start_date : '',
      end_date: promo?.end_date ? promo.end_date : '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!image && !imageURL) {
        setImageError('Изображение акции обязательно');

        return;
      }

      const updatedPromo: PromoDataCardProps & { promo_id: number } = {
        promo_id: promoId,
        title: values.title,
        description: values.description,
        photo: values.link,
        link: values.link,
        start_date: values.start_date,
        end_date: values.end_date,
      };

      await promoStore.editPromo(updatedPromo);

      setTimeout(() => {
        navigate('/stocks');
      }, 2000);
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
              label="Подробное описание"
              placeholder="Введите подробное описание акции"
              variant="standard"
              multiline
              rows={4}
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
              id="link"
              name="link"
              label="Ссылка на акцию"
              placeholder="Введите ссылку на акцию"
              variant="standard"
              value={formik.values.link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.link && Boolean(formik.errors.link)}
              helperText={formik.touched.link && formik.errors.link}
            />
            <TextField
              fullWidth
              id="start_date"
              name="start_date"
              label="Дата начала акции"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              value={formik.values.start_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.start_date && Boolean(formik.errors.start_date)
              }
              helperText={formik.touched.start_date && formik.errors.start_date}
            />
            <TextField
              fullWidth
              id="end_date"
              name="end_date"
              label="Дата конца акции"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="standard"
              value={formik.values.end_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.end_date && Boolean(formik.errors.end_date)}
              helperText={formik.touched.end_date && formik.errors.end_date}
            />
            <Box className="modalBtns">
              <Button
                className="modalBtn"
                variant="contained"
                type="submit"
                disabled={!formik.isValid || !formik.dirty || !imageURL}
              >
                {isLoading ? (
                  <CircularProgress className="loadingBtn" />
                ) : (
                  'Сохранить'
                )}
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
