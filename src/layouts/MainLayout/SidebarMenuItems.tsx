import { Home, ContentPaste, People } from '@mui/icons-material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { FaGlasses } from 'react-icons/fa';

import IMenuItem from 'types/IMenuItem';

const menuItems: IMenuItem[] = [
  {
    text: 'Главная панель',
    icon: <Home />,
    path: '/',
  },
  {
    text: 'Контент',
    icon: <ContentPaste />,
    children: [
      {
        text: 'Акции',
        icon: <InventoryOutlinedIcon />,
        path: '/stocks',
      },
      {
        text: 'Услуги',
        icon: <MedicalServicesOutlinedIcon />,
        path: '/services',
      },
      {
        text: 'Товары',
        icon: <FaGlasses size={24} />,
        path: '/items',
      },
      {
        text: 'Филиалы',
        icon: <PinDropOutlinedIcon />,
        path: '/filials',
      },
      {
        text: 'Доктора',
        icon: <GroupsOutlinedIcon />,
        path: '/doctors',
      },
    ],
  },
  {
    text: 'Пользователи',
    icon: <People />,
    path: '/users',
  },
];

export default menuItems;
