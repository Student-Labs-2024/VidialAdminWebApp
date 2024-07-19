import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  ListItemButton,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import CollapsibleMenuItem from './CollapsibleMenuItem';
import DefaultTheme from '../../theme/DefaultTheme';
import menuItems from './SidebarMenuItems';


const Sidebar: React.FC = () => {
  const colors = DefaultTheme.palette;
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <Drawer
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: colors.primary.main,
          color: colors.secondary.main,
          position: 'relative',
        },
      }}
      anchor="left"
      variant="permanent"
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
              <CollapsibleMenuItem key={index} item={item} index={index} currentPath={location.pathname} />
            ) : (
              <NavLink
                to={item.path!}
                key={index}
                style={{ textDecoration: 'none' }}
              >
                <ListItemButton
                  sx={{
                    color: activePath === item.path ? colors.primary.main : colors.secondary.main,
                    backgroundColor: activePath === item.path ? colors.secondary.main : 'transparent',
                    borderRadius: '30px',
                    '& .MuiListItemIcon-root': {
                      color: activePath === item.path ? colors.primary.main : colors.secondary.main,
                    },
                  }}
                  onClick={() => setActivePath(item.path!)}
                >
                  <ListItemIcon
                    sx={{
                      color: activePath === item.path ? colors.primary.main : colors.secondary.main,
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
