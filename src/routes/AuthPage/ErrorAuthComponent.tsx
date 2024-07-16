import { Box, Container, Typography } from '@mui/material';


const ErrorAuthComponent = () => {
    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: 'grey[600]',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'secondary.main',
                        width: '400px',
                        height: '200px',
                        borderRadius: '20px',
                    }}
                >
                    <Typography sx={{
                        color: 'text.secondary',
                        fontWeight: 'bold',
                        fontSize: '50px',
                    }}>Ошибка 404</Typography>
                </Box>
            </Container>
        </>
    )
}

export default ErrorAuthComponent;