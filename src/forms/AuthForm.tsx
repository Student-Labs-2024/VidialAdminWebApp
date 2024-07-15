import { TextField, Button } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';


const validationSchema = yup.object({
    name: yup
        .string()
        .required('Требуется логин'),
    password: yup
        .string()
        .required('Требуется пароль'),
});

const AuthForm = () => {
    const authForm = useFormik({
        initialValues: {
            name: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (<>
        <TextField
            fullWidth
            id="name"
            name="name"
            label="Логин"
            variant="standard"
            value={authForm.values.name}
            onChange={authForm.handleChange}
            onBlur={authForm.handleBlur}
            error={authForm.touched.name && Boolean(authForm.errors.name)}
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
            onChange={authForm.handleChange}
            onBlur={authForm.handleBlur}
            error={authForm.touched.password && Boolean(authForm.errors.password)}
            helperText={authForm.touched.password && authForm.errors.password}
            placeholder="Введите пароль"
        />
        <Button variant="contained" type="submit">Войти</Button>
    </>);
}

export default AuthForm;