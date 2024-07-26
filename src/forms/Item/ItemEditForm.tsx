import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { makeStyles } from 'tss-react/mui';
import { observer } from 'mobx-react-lite';
import itemStore from 'stores/ItemStore';
import ItemsCardProps from 'types/Items/ItemsCardProps';

const validationSchema = yup.object({
  img: yup.string().required('Загрузите изображение товара'),
  title: yup.string().required('Требуется название товара'),
  description: yup.string().required('Требуется описание товара'),
  price: yup
    .number()
    .required('Требуется указать цену товара')
    .positive('Цена должна быть положительной'),
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
    justifyContent: 'center',
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

interface ItemEditFormProps {
  open: boolean;
  handleClose: () => void;
  item: ItemsCardProps;
  setOpenSnackbar: (value: boolean) => void;
}

const ItemEditForm: React.FC<ItemEditFormProps> = observer((props) => {
  const { item, handleClose, setOpenSnackbar } = props;
  const { classes } = useStyles();
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>('');
  const [imageURL, setImageURL] = useState<string | null>(item.img);

  useEffect(() => {
    if (item.img) {
      setImageURL(item.img);
    }
  }, [item]);

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
        manufacture: item.manufacture,
        brand: item.brand,
        index: item.index,
        cover: item.cover,
        color: item.color,
        diameter: item.diameter,
        material: item.material,
        geometry: item.geometry,
        lensType: item.lensType,
        lensClass: item.lensClass,
        technology: item.technology,
        dioptre: item.dioptre,
        cylinder: item.cylinder,
        add: item.add,
        amount: item.amount,
        department: item.department,
      };

      itemStore.editItem(updatedItem);
      setOpenSnackbar(true);
      handleClose();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap="10px">
        <Box className={classes.formContainer}>
          <Box className={classes.formInputs}>
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
                formik.touched.description && Boolean(formik.errors.description)
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
                onClick={handleClose}
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
                      Загрузите новое фото товара
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
                {String(formik.errors.img)}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </form>
  );
});

export default ItemEditForm;
