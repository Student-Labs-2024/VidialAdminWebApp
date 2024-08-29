import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite';

import itemStore from 'stores/ItemStore';
import ItemsCardProps from 'types/Items/ItemsCardProps';
import { Slide, toast } from 'react-toastify';
import UploadImageBtn from 'components/UploadImageBtn';

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
}

const ItemEditForm = ({ handleClose, item }: ItemEditFormProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>('');
  const [imageURL, setImageURL] = useState<string | null>(item.img);

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
        <Box className="formContainer">
          <Box className="formInputs">
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
            <Box className="modalBtns">
              <Button
                className="modalBtn"
                variant="contained"
                type="submit"
                disabled={!formik.isValid || !formik.dirty || !imageURL}
                onClick={() =>
                  toast.success('Товар отредактирован!', { transition: Slide })
                }
              >
                Сохранить
              </Button>
              <Button
                className="modalBtn"
                variant="contained"
                onClick={handleClose}
              >
                Отмена
              </Button>
            </Box>
          </Box>
          <Box className="uploadButtonContainer">
            <UploadImageBtn
              imageUrl={imageURL}
              setImageUrl={(url) => {
                setImageURL(url);
                formik.setFieldValue('img', url);
              }}
              setImageFile={setImage}
              imageError={imageError}
              setImageError={setImageError}
              text="Загрузите новое фото товара"
            />
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
export default observer(ItemEditForm);
