import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  menuContainer: {
    marginTop: '15px',
  },
  menuItemText: {
    color: theme.palette.text.secondary,
  },
}));

const tagDictionary: { [key: string]: string } = {
  'Диагностика лечения': 'DT',
  'Аппаратное лечение': 'HT',
};

const MenuFilterBtn = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (tag: string) => {
    navigate(`/services/${tag}`);
    handleClose();
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
        {Object.entries(tagDictionary).map(([name, tag]) => (
          <MenuItem
            key={tag}
            className={classes.menuItemText}
            onClick={() => handleNavigate(tag)}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MenuFilterBtn;
