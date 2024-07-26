import React, { useState, useEffect } from 'react';
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
import { makeStyles } from 'tss-react/mui';

import menuItems from './SidebarMenuItems';
import CollapsibleMenuItem from './CollapsibleMenuItem';
import { ExitToApp } from '@mui/icons-material';
import WarningWindow from './WarningWindowExit';

const useStyles = makeStyles()((theme) => ({
  drawerPaper: {
    '& .MuiDrawer-paper': {
      width: '320px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      position: 'relative',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
  },
  logo: {
    maxWidth: '200px',
    width: '100%',
    height: 'auto',
    textAlign: 'center',
    paddingBottom: '22px',
  },
  divider: {
    backgroundColor: theme.palette.secondary.main,
    width: '90%',
    margin: '5px',
  },
  listBtns: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  navLink: {
    textDecoration: 'none',
  },
  listItemBtn: {
    borderRadius: '30px',
    '&.active': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
    },
    '&.inactive': {
      color: theme.palette.secondary.main,
      backgroundColor: 'transparent',
      '& .MuiListItemIcon-root': {
        color: theme.palette.secondary.main,
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
    '&:hover .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}));

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  const { classes } = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <Drawer
      className={classes.drawerPaper}
      anchor="left"
      variant="permanent"
      open={true}
    >
      <Box className={classes.container}>
        <Box
          className={classes.logo}
          component="img"
          alt="Vidial_logo"
          src="img/logo.svg"
        />

        <Divider className={classes.divider} />
        <List className={classes.listBtns}>
          {menuItems.map((item, index) => {
            return item.children ? (
              <CollapsibleMenuItem
                key={index}
                item={item}
                index={index}
                currentPath={location.pathname}
              />
            ) : (
              <NavLink to={item.path!} key={index} className={classes.navLink}>
                <ListItemButton
                  className={`${classes.listItemBtn} ${activePath === item.path ? 'active' : 'inactive'}`}
                  onClick={() => setActivePath(item.path!)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '18px',
                      fontWeight: 700,
                    }}
                  />
                </ListItemButton>
              </NavLink>
            );
          })}
          <Divider className={classes.divider} />
          <ListItemButton
            className={`${classes.listItemBtn} ${activePath === '/auth' ? 'active' : 'inactive'}`}
            onClick={handleOpen}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText
              primary="Выйти"
              primaryTypographyProps={{
                fontSize: '18px',
                fontWeight: 700,
              }}
            />
          </ListItemButton>
        </List>
      </Box>
      <WarningWindow
        open={open}
        handleClose={handleClose}
        text="Вы действительно хотите выйти?"
      />
    </Drawer>
  );
};

export default Sidebar;
