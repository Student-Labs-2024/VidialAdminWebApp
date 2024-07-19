import IMenuItem from '../../types/IMenuItem';
import { Home, ContentPaste, People, ExitToApp } from '@mui/icons-material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { FaGlasses } from 'react-icons/fa';
import CustomTypography from './CustomTypography';


const menuItems: IMenuItem[] = [
    {
        text: <CustomTypography>Главная панель</CustomTypography>,
        icon: <Home />,
        path: '/',
    },
    {
        text: <CustomTypography>Контент</CustomTypography>,
        icon: <ContentPaste />,
        children: [
            {
                text: <CustomTypography>Акции</CustomTypography>,
                icon: <InventoryOutlinedIcon />,
                path: '/stocks',
            },
            {
                text: <CustomTypography>Услуги</CustomTypography>,
                icon: <MedicalServicesOutlinedIcon />,
                path: '/services',
            },
            {
                text: <CustomTypography>Товары</CustomTypography>,
                icon: <FaGlasses size={24} />,
                path: '/items',
            },
            {
                text: <CustomTypography>Филиалы</CustomTypography>,
                icon: <PinDropOutlinedIcon />,
                path: '/filials',
            },
            {
                text: <CustomTypography>Доктора</CustomTypography>,
                icon: <GroupsOutlinedIcon />,
                path: '/doctors',
            },
        ],
    },
    {
        text: <CustomTypography>Пользователи</CustomTypography>,
        icon: <People />,
        path: '/users',
    },
    {
        text: <CustomTypography>Выйти</CustomTypography>,
        icon: <ExitToApp />,
        path: '/logout',
    },
];

export default menuItems;