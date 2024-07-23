import { TextField, Button } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import authStore from 'stores/AuthStore';
import { useNavigate } from 'react-router';

const validationSchema = yup.object({
  name: yup.string().required('Требуется логин'),
  password: yup.string().required('Требуется пароль'),
});

const AuthForm = observer(() => {
  const [loginError, setLoginError] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginError('');
    authForm.handleChange(e);
  };

  const authForm = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      authStore.login(values.name, values.password);
      if (authStore.isAuthenticated) {
        navigate('/');
        setLoginError('');
      } else {
        setLoginError('Неправильный логин или пароль');
      }
    },
  });

  return (
    <form onSubmit={authForm.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Логин"
        variant="standard"
        value={authForm.values.name}
        onChange={handleChange}
        onBlur={authForm.handleBlur}
        error={
          (authForm.touched.name && Boolean(authForm.errors.name)) ||
          Boolean(loginError)
        }
        helperText={authForm.touched.name && authForm.errors.name}
        placeholder="Введите логин"
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
      <Button variant="contained" type="submit">
        Войти
      </Button>
    </form>
  );
});

export default AuthForm;
