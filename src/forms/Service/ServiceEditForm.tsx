import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { observer } from 'mobx-react-lite';

import serviceStore from 'stores/ServiceStore';
import ServiceDataCardProps from 'types/Service/ServiceDataCardProps';

const validationSchemaDT = yup.object({
  title: yup.string().required('Требуется название услуги'),
  description: yup.string(),
  price: yup
    .number()
    .required('Требуется цена услуги')
    .min(0, 'Цена не может быть отрицательной'),
});

const validationSchemaHT = yup.object({
  title: yup.string().required('Требуется название услуги'),
  countProcedures: yup
    .number()
    .required('Требуется количество процедур')
    .min(1, 'Количество процедур должно быть минимум 1'),
  price: yup
    .number()
    .required('Требуется цена услуги')
    .min(0, 'Цена не может быть отрицательной'),
});

interface ServiceEditFormProps {
  notify: () => void;
  handleClose: () => void;
  service: ServiceDataCardProps;
}

const ServiceEditForm: React.FC<ServiceEditFormProps> = ({
  notify,
  handleClose,
  service,
}) => {
  const isDT = service.tag === 'DT';

  const formik = useFormik({
    initialValues: {
      title: service.title || '',
      description: service.description || '',
      countProcedures: service.countProcedures || '',
      price: service.price || '',
    },
    validationSchema: isDT ? validationSchemaDT : validationSchemaHT,
    onSubmit: (values) => {
      const updatedService: ServiceDataCardProps = {
        id: service.id,
        title: values.title,
        description: values.description,
        countProcedures: isDT ? 0 : Number(values.countProcedures),
        price: Number(values.price),
        tag: service.tag,
      };

      serviceStore.editService(updatedService);
      notify();
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
              label="Название услуги"
              placeholder="Введите название услуги"
              variant="standard"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            {isDT && (
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Описание услуги"
                placeholder="Введите описание услуги"
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
            )}
            {!isDT && (
              <TextField
                fullWidth
                id="countProcedures"
                name="countProcedures"
                label="Количество процедур"
                placeholder="Введите количество процедур"
                variant="standard"
                value={formik.values.countProcedures}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.countProcedures &&
                  Boolean(formik.errors.countProcedures)
                }
                helperText={
                  formik.touched.countProcedures &&
                  formik.errors.countProcedures
                }
              />
            )}
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Цена услуги"
              placeholder="Введите цену услуги"
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
                disabled={!formik.isValid || !formik.dirty}
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
        </Box>
      </Box>
    </form>
  );
};

export default observer(ServiceEditForm);
