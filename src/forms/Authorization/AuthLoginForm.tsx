import { TextField, Button, Box, CircularProgress } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import authStore from 'stores/AuthStore';
import { useNavigate } from 'react-router';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Некорректный формат email')
    .required('Требуется email'),
  password: yup
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Требуется пароль'),
});

const AuthLoginForm = observer(() => {
  const [loginError, setLoginError] = React.useState('');
  const navigate = useNavigate();
  const { isLoading } = authStore;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginError('');
    authForm.handleChange(e);
  };

  const authForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoginError('');
      await authStore.login(values.email, values.password);

      if (authStore.isAuthenticated) {
        navigate('/');
      } else {
        setLoginError('Неправильный логин или пароль');
      }
    },
  });

  return (
    <form onSubmit={authForm.handleSubmit}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        variant="standard"
        value={authForm.values.email}
        onChange={handleChange}
        onBlur={authForm.handleBlur}
        error={
          (authForm.touched.email && Boolean(authForm.errors.email)) ||
          Boolean(loginError)
        }
        helperText={authForm.touched.email && authForm.errors.email}
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
          {isLoading ? <CircularProgress className="loadingBtn" /> : 'Войти'}
        </Button>
      </Box>
    </form>
  );
});

export default AuthLoginForm;
