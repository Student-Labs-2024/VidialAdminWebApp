import React, { useState } from 'react';
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

import CollapsibleMenuItemProps from 'types/CollapsibleMenuItemProps';
import useGlobalStyles from 'theme/globalStyles';

const useStyles = makeStyles()((theme) => ({
  collapseBtn: {
    backgroundColor: theme.palette.primary.dark,
    borderRadius: '30px',
    padding: '0 10px',
  },
  navLink: {
    textDecoration: 'none',
    color: theme.palette.grey[600],
  },
}));

const CollapsibleMenuItem: React.FC<CollapsibleMenuItemProps> = ({
  item,
  index,
  currentPath,
}) => {
  const [open, setOpen] = useState<boolean>(() => {
    const savedState = localStorage.getItem(`menuOpenState-${index}`);
    return savedState ? JSON.parse(savedState) : false;
  });

  const { classes } = useStyles();
  const globalClasses = useGlobalStyles();

  const handleClick = () => {
    const newOpenState = !open;

    setOpen(newOpenState);

    localStorage.setItem(
      `menuOpenState-${index}`,
      JSON.stringify(newOpenState),
    );
  };

  const isActive = (path: string) => {
    return currentPath.startsWith(path);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        className={`${globalClasses.classes.listItemBtn} ${open ? 'active' : 'inactive'}`}
      >
        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.text}
          primaryTypographyProps={{ fontSize: '18px', fontWeight: 700 }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        className={classes.collapseBtn}
        timeout={{ enter: 700, exit: 500 }}
        easing="dissolve-in-out"
        in={open}
      >
        <List component="div" disablePadding>
          {item.children?.map((subItem, subIndex) => (
            <NavLink
              to={subItem.path!}
              key={subIndex}
              className={classes.navLink}
            >
              <ListItemButton
                className={`${globalClasses.classes.listMenuItemBtn} ${isActive(subItem.path!) ? 'active' : 'inactive'}`}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {subItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={subItem.text}
                  primaryTypographyProps={{ fontSize: '18px', fontWeight: 700 }}
                />
              </ListItemButton>
            </NavLink>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsibleMenuItem;
