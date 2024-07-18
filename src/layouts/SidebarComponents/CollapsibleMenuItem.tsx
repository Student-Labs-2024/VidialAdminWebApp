import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    localStorage.setItem(`menuOpenState-${index}`, JSON.stringify(open));
  }, [open, index]);

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
        <ListItemIcon sx={{ color: 'secondary.main' }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
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
              style={({ isActive }) => ({
                color: isActive ? colors.secondary.main : colors.grey[600],
                backgroundColor: isActive ? colors.secondary.main : '',
                '&.MuiListItemIcon-root': {
                  color: isActive ? colors.secondary.main : colors.grey[600],
                },
                textDecoration: 'none',
              })}
            >
              <ListItemButton
                sx={{
                  '.MuiListItemIcon-root': {
                    color: colors.grey[600],
                  },
                }}
              >
                <ListItemIcon sx={{ color: colors.secondary.main }}>
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
