import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Avatar,
  Backdrop,
  Fade,
  Modal,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite';
import { Slide, toast } from 'react-toastify';
import { makeStyles } from 'tss-react/mui';

import doctorStore from 'stores/DoctorStore';
import { DoctorCardProps } from 'types/Doctor/DoctorCardProps';

const useStyles = makeStyles()((theme) => ({
  modalBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '660px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    padding: '30px 80px',
    borderRadius: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
  },
}));

const validationSchema = yup.object({
  img: yup.string().required('Загрузите фото доктора'),
});

interface DoctorEditFormProps {
  open: boolean;
  handleClose: () => void;
  doctor: DoctorCardProps;
}

const DoctorEditForm = ({ open, handleClose, doctor }: DoctorEditFormProps) => {
  const { classes } = useStyles();
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>('');
  const [imageURL, setImageURL] = useState<string | null>(doctor.portrait);

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
      setImage(file);
      setImageURL(img.src);
      setImageError('');
      formik.setFieldValue('img', img.src);
    };
  };

  const handleImageDelete = () => {
    setImage(null);
    setImageURL(null);
    formik.setFieldValue('img', '');
  };

  const formik = useFormik({
    initialValues: {
      img: doctor.portrait,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!image) {
        setImageError('Фото доктора обязательно');

        return;
      }

      if (doctorStore.selectedDoctor) {
        const updatedDoctor: DoctorCardProps = {
          ...doctorStore.selectedDoctor,
          portrait: values.img,
        };

        doctorStore.editDoctor(updatedDoctor);
        toast.success('Фото доктора изменено!', {
          transition: Slide,
        });
        handleClose();
      }
    },
  });

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
          <form onSubmit={formik.handleSubmit}>
            <Box display="flex" flexDirection="column" gap="10px">
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
                        <Box
                          component="img"
                          src="/img/upload.svg"
                          alt="upload"
                        />
                        <Typography className="uploadBtnText" variant="body2">
                          Загрузите новое фото доктора
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
                    <Avatar
                      className="uploadedImage"
                      src={imageURL}
                      alt="uploaded"
                      sx={{ width: '300px', height: '300px' }}
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
                  *Форматы изображений: jpg, png. Рекомендуемый размер:
                  1024x1024.
                </Typography>
                {formik.errors.img && (
                  <Typography color="error" className="uploadTextError">
                    {formik.errors.img}
                  </Typography>
                )}
              </Box>
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
                  onClick={handleClose}
                >
                  Отмена
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default observer(DoctorEditForm);