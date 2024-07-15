import { Box, Container, Typography } from '@mui/material';
import DefaultTheme from '../../theme/DefaultTheme';
import AuthForm from '../../forms/AuthForm';

const AuthComponent = () => {
    return (<>
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: DefaultTheme.palette.background.default
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 730,
                    height: 'auto',
                    bgcolor: DefaultTheme.palette.secondary.main,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '6px 4px 4px 0px rgba(0, 0, 0, 0.10)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '26px',
                        padding: '55px',
                        width: '50%',
                        bgcolor: DefaultTheme.palette.grey[600]
                    }}
                >
                    <Box sx={{
                        maxWidth: '199px',
                        width: '100%',
                        height: 'auto',
                    }}
                        component="img" alt="Vidial_logo" src="img\logo.svg" />
                    <Box sx={{
                        width: '100%',
                        height: 'auto',
                    }}
                        component="img" src="img\bro.svg" alt="Vidial_picture" />
                </Box>
                <Box sx={{
                    textAlign: 'center',
                    padding: '76px 64px',
                    width: '50%',
                }}>
                    <Typography sx={{
                        color: DefaultTheme.palette.text.secondary,
                        fontWeight: DefaultTheme.typography.h1,
                        fontSize: DefaultTheme.typography.h1,
                        marginBottom: '25px',
                    }}>
                        Вход
                    </Typography>
                    <AuthForm />

                </Box>
            </Box>
        </Container>
    </>);
}

export default AuthComponent;