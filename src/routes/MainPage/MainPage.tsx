import { Container } from '@mui/material';
import Sidebar from '../../layouts/Sidebar';
import PageContent from '../../layouts/PageContent';

const MainPage = () => {
    return (
        <Container sx={{
            backgroundColor: "background.default",
        }}>
            <Sidebar />
            <PageContent></PageContent>
        </Container>
    )
}

export default MainPage;