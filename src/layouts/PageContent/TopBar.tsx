import React from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  topBar: {
    width: '100%',
    height: '75px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: '20px',
    marginBottom: '25px',
    paddingLeft: '25px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
  },
}));

const NavigationNameMap: { [key: string]: string } = {
  '/': 'Главная панель',
  '/stocks': 'Акции',
  '/services': 'Услуги',
  '/items': 'Товары',
  '/filials': 'Филиалы',
  '/doctors': 'Доктора',
  '/users': 'Пользователи',
};

const TopBar: React.FC = () => {
  const location = useLocation();
  const { classes } = useStyles();

  return (
    <Box className={classes.topBar}>
      <Typography className={classes.title}>
        {NavigationNameMap[location.pathname]}
      </Typography>
    </Box>
  );
};

export default TopBar;
