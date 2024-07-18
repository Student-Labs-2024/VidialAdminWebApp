import React from 'react';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  ListItemButton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import CollapsibleMenuItem from './CollapsibleMenuItem';
import DefaultTheme from '../../theme/DefaultTheme';
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

const Sidebar: React.FC = () => {
  const colors = DefaultTheme.palette;

  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: colors.primary.main,
          color: colors.secondary.main,
        },
      }}
      anchor="left"
      variant="temporary"
      open={true}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px',
        }}
      >
        <Box
          sx={{
            maxWidth: '200px',
            width: '100%',
            height: 'auto',
            textAlign: 'center',
            paddingBottom: '22px',
          }}
          component="img"
          alt="Vidial_logo"
          src="img/logo.svg"
        />

        <Divider
          sx={{
            backgroundColor: colors.secondary.main,
            width: '90%',
            margin: '5px',
          }}
        />
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {menuItems.map((item, index) =>
            item.children ? (
              <CollapsibleMenuItem key={index} item={item} index={index} />
            ) : (
              <NavLink
                to={item.path!}
                key={index}
                style={({ isActive }) => ({
                  color: isActive ? colors.primary.main : 'inherit',
                  backgroundColor: isActive ? colors.secondary.main : '',
                  borderRadius: '30px',
                  '.MuiListItemIcon-root': {
                    color: isActive ? colors.primary.main : 'inherit',
                  },
                  textDecoration: isActive ? 'none' : 'none',
                })}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color: colors.secondary.main,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </NavLink>
            ),
          )}
        </List>
        <Divider
          sx={{
            backgroundColor: colors.secondary.main,
            width: '90%',
            margin: '5px',
          }}
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;