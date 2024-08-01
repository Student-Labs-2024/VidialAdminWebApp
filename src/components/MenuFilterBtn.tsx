import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  menuContainer: {
    marginTop: '15px',
  },
  menuItemText: {
    color: theme.palette.text.secondary,
  },
}));

const MenuFilterBtn = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { classes } = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Выбрать фильтр" placement="bottom">
        <IconButton
          sx={{ padding: 0 }}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <FiFilter className="filterBtn" />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className={classes.menuContainer}
      >
        <MenuItem className={classes.menuItemText} onClick={handleClose}>
          Диагностика лечения
        </MenuItem>
        <MenuItem className={classes.menuItemText} onClick={handleClose}>
          Аппаратное лечение
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuFilterBtn;
