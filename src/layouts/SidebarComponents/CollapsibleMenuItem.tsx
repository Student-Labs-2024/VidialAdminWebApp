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
import DefaultTheme from '../../theme/DefaultTheme';
import CollapsibleMenuItemProps from '../../types/CollapsibleMenuItemProps';

const CollapsibleMenuItem: React.FC<CollapsibleMenuItemProps> = ({
  item,
  index,
  currentPath,
}) => {
  const [open, setOpen] = useState<boolean>(() => {
    const savedState = localStorage.getItem(`menuOpenState-${index}`);
    return savedState ? JSON.parse(savedState) : false;
  });
  const colors = DefaultTheme.palette;

  const handleClick = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    localStorage.setItem(
      `menuOpenState-${index}`,
      JSON.stringify(newOpenState),
    );
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        sx={{
          borderRadius: '30px',
          backgroundColor: open ? colors.secondary.main : '',
          color: open ? colors.primary.main : '',
          '.MuiListItemIcon-root': {
            color: open ? colors.primary.main : '',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.text}
          primaryTypographyProps={{ fontSize: '18px', fontWeight: 700 }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        sx={{
          backgroundColor: colors.primary.dark,
          borderRadius: '30px',
          padding: '0 10px',
        }}
        timeout={{ enter: 700, exit: 500 }}
        easing="dissolve-in-out"
        in={open}
      >
        <List component="div" disablePadding>
          {item.children?.map((subItem, subIndex) => (
            <NavLink
              to={subItem.path!}
              key={subIndex}
              style={{
                color:
                  currentPath === subItem.path
                    ? colors.secondary.main
                    : colors.grey[600],
                backgroundColor:
                  currentPath === subItem.path ? colors.secondary.main : '',
                textDecoration: 'none',
              }}
            >
              <ListItemButton
                sx={{
                  borderRadius: '30px',
                  backgroundColor:
                    currentPath === subItem.path
                      ? colors.secondary.main
                      : 'transparent',
                  color:
                    currentPath === subItem.path
                      ? colors.primary.main
                      : 'inherit',
                  '.MuiListItemIcon-root': {
                    color:
                      currentPath === subItem.path
                        ? colors.primary.main
                        : colors.grey[600],
                  },
                }}
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
