import { TextField, Button, Box, CircularProgress } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import authStore from 'stores/AuthStore';

const validationSchema = yup.object({
  name: yup
    .string()
    .email('Некорректный формат email')
    .required('Требуется логин'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Требуется пароль'),
});

const AuthRegisterForm = observer(() => {
  const [loginError, setLoginError] = React.useState('');
  const { isLoading } = authStore;

  const authForm = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoginError('');
      await authStore.register(
        values.name,
        values.password,
        true,
        false,
        false,
      );

      if (!authStore.isAuthenticated) {
        setLoginError('Ошибка регистрации');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginError('');
    authForm.handleChange(e);
  };

  return (
    <form onSubmit={authForm.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Email"
        variant="standard"
        value={authForm.values.name}
        onChange={handleChange}
        onBlur={authForm.handleBlur}
        error={
          (authForm.touched.name && Boolean(authForm.errors.name)) ||
          Boolean(loginError)
        }
        helperText={authForm.touched.name && authForm.errors.name}
        placeholder="Введите email"
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Пароль"
        type="password"
        variant="standard"
        value={authForm.values.password}
        onChange={handleChange}
        onBlur={authForm.handleBlur}
        error={
          (authForm.touched.password && Boolean(authForm.errors.password)) ||
          Boolean(loginError)
        }
        helperText={
          (authForm.touched.password && authForm.errors.password) || loginError
        }
        placeholder="Введите пароль"
      />
      <Box display="flex" flexDirection="column" gap="10px">
        <Button fullWidth variant="contained" type="submit">
          {isLoading ? (
            <CircularProgress className="loadingBtn" />
          ) : (
            'Зарегистрироваться'
          )}
        </Button>
      </Box>
    </form>
  );
});

export default AuthRegisterForm;
