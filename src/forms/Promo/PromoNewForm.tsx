import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import promoStore from 'stores/PromoStore';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import UploadImageBtn from 'components/UploadImageBtn';
import UploadMiniImageBtn from './UploadMiniImageBtn';

const validationSchema = yup.object({
  img: yup.string().required('Загрузите изображение акции'),
  title: yup.string().required('Требуется название акции'),
  description: yup.string().required('Требуется описание акции'),
  link: yup.string().required('Требуется ссылка на акцию'),
  startDate: yup.date().required('Требуется дата начала акции'),
  endDate: yup.date().required('Требуется дата конца акции'),
  mini_photo: yup.string().required('Загрузите мини изображение акции'),
  color: yup.string().required('Требуется цвет мини акции'),
});

const colorOptions = [
  { value: '#97001E', label: 'Красный', color: 'white' },
  { value: '#F39998', label: 'Светло-красный' },
  { value: '#D7D7D7', label: 'Светло-серый' },
];

const PromoNewForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>('');
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [miniImage, setMiniImage] = useState<File | null>(null);
  const [miniImageError, setMiniImageError] = useState<string>('');
  const [miniImageURL, setMiniImageURL] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#7676801F');
  const navigate = useNavigate();
  const { isLoading } = promoStore;

  const formik = useFormik({
    initialValues: {
      img: '',
      title: '',
      description: '',
      link: '',
      startDate: '',
      endDate: '',
      mini_photo: '',
      color: '',
      mini_link: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!image) {
        setImageError('Изображение акции обязательно');

        return;
      }

      if (!miniImage) {
        setMiniImageError('Мини изображение акции обязательно');

        return;
      }

      const newPromo: PromoDataCardProps = {
        title: values.title,
        description: values.description,
        photo: values.link,
        link: values.link,
        start_date: values.startDate,
        end_date: values.endDate,
        mini_photo: values.mini_link,
        short_title: values.title,
        color: values.color,
      };

      await promoStore.addPromo(newPromo);
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
              id="mini_link"
              name="mini_link"
              label="Ссылка на мини акцию"
              placeholder="Введите ссылку на мини акцию"
              variant="standard"
              value={formik.values.mini_link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.mini_link && Boolean(formik.errors.mini_link)
              }
              helperText={formik.touched.mini_link && formik.errors.mini_link}
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
            <TextField
              fullWidth
              id="color"
              name="color"
              label="Цвет мини акции"
              select
              variant="standard"
              value={formik.values.color}
              onChange={(e) => {
                formik.handleChange(e);
                setSelectedColor(e.target.value);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.color && Boolean(formik.errors.color)}
              helperText={formik.touched.color && formik.errors.color}
            >
              {colorOptions.map((option) => (
                <MenuItem
                  className="colorMenuItem"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box className="modalBtns">
              <Button
                className="modalBtn"
                variant="contained"
                type="submit"
                disabled={
                  !formik.isValid || !formik.dirty || !imageURL || !miniImageURL
                }
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
          <Box className="promoImageAndMiniContainer">
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
                text="Загрузите новое фото акции"
              />
              {formik.errors.img && (
                <Typography color="error" className="uploadTextError">
                  {formik.errors.img}
                </Typography>
              )}
            </Box>
            <Box className="miniPromo">
              <Typography className="colorMenuItem">
                Предпросмотр мини акции:
              </Typography>
              <Box
                className="miniPromoBox"
                sx={{
                  backgroundColor: selectedColor,
                }}
              >
                <Typography
                  className={`miniPromoText ${selectedColor === '#97001E' ? 'white' : 'not'}`}
                >
                  {formik.values.title
                    ? formik.values.title
                    : 'Введите название'}
                </Typography>
                <UploadMiniImageBtn
                  imageUrl={miniImageURL}
                  setImageUrl={(url) => {
                    setMiniImageURL(url);
                    formik.setFieldValue('mini_photo', url);
                  }}
                  setImageFile={setMiniImage}
                  imageError={miniImageError}
                  setImageError={setMiniImageError}
                  selectedColor={selectedColor}
                />
                {formik.errors.mini_photo && (
                  <Typography color="error" className="uploadTextError">
                    {formik.errors.mini_photo}
                  </Typography>
                )}
              </Box>
              <Typography className="uploadBtnWarning" variant="body2">
                *Форматы изображений: JPG, PNG. Максимальный размер: x64.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default observer(PromoNewForm);
