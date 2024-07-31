import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite'

import itemStore from 'stores/ItemStore';
import ItemsCardProps from 'types/Items/ItemsCardProps';
import useGlobalStyles from 'theme/globalStyles';

const validationSchema = yup.object({
  img: yup.string().required('Загрузите изображение товара'),
  title: yup.string().required('Требуется название товара'),
  description: yup.string().required('Требуется описание товара'),
  price: yup
    .number()
    .required('Требуется указать цену товара')
    .positive('Цена должна быть положительной'),
});

interface ItemEditFormProps {
  open: boolean;
  handleClose: () => void;
  item: ItemsCardProps;
  notify: () => void;
}

const ItemEditForm =
  ({ handleClose, item, notify }: ItemEditFormProps) => {
    const globalClasses = useGlobalStyles()
    const [image, setImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string>('');
    const [imageURL, setImageURL] = useState<string | null>(item.img);

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
        img: item.img || '',
        title: item.title || '',
        description: item.description || '',
        price: item.price || 0,
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        if (!image && !imageURL) {
          setImageError('Изображение товара обязательно');
          return;
        }

        const updatedItem: ItemsCardProps = {
          ...item,
          img: values.img,
          title: values.title,
          description: values.description,
          price: values.price,
        };

        itemStore.editItem(updatedItem);
        handleClose();
      },
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap="10px">
          <Box className={globalClasses.classes.formContainer}>
            <Box className={globalClasses.classes.formInputs}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Название товара"
                placeholder="Введите название товара"
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
                label="Описание товара"
                placeholder="Введите описание товара"
                variant="standard"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Цена товара"
                placeholder="Введите цену товара"
                variant="standard"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <Box className={globalClasses.classes.modalBtns}>
                <Button
                  className={globalClasses.classes.modalBtn}
                  variant="contained"
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty || !imageURL}
                  onClick={notify}
                >
                  Сохранить
                </Button>
                <Button
                  className={globalClasses.classes.modalBtn}
                  variant="contained"
                  onClick={handleClose}
                >
                  Отмена
                </Button>
              </Box>
            </Box>
            <Box className={globalClasses.classes.uploadButtonContainer}>
              {!imageURL ? (
                <>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-image"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="upload-image"
                    className={globalClasses.classes.uploadButton}
                  >
                    <Button
                      className={globalClasses.classes.uploadButtonStyle}
                      component="span"
                    >
                      <Box component="img" src="/img/upload.svg" alt="upload" />
                      <Typography
                        className={globalClasses.classes.uploadBtnText}
                        variant="body2"
                      >
                        Загрузите новое фото товара
                      </Typography>
                    </Button>
                  </label>
                  {imageError && (
                    <Typography className={globalClasses.classes.uploadTextError}>
                      {imageError}
                    </Typography>
                  )}
                </>
              ) : (
                <Box className={globalClasses.classes.uploadedImageContainer}>
                  <Box
                    className={globalClasses.classes.uploadedImage}
                    component="img"
                    src={imageURL}
                    alt="uploaded"
                    width="100%"
                  />
                  <Button
                    className={globalClasses.classes.deleteButton}
                    onClick={handleImageDelete}
                    variant="contained"
                  >
                    Удалить
                  </Button>
                </Box>
              )}
              <Typography
                className={globalClasses.classes.uploadBtnWarning}
                variant="body2"
                color="red"
              >
                *Форматы изображений: jpg, png. Рекомендуемый размер: 1024x1024.
              </Typography>
              {formik.errors.img && (
                <Typography color="error" className={globalClasses.classes.uploadTextError}>
                  {String(formik.errors.img)}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </form>
    );
  }
  ;

export default observer(ItemEditForm);
