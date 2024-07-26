import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { useLocation, NavLink } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

interface Classes {
  title: string;
  link: string;
}

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
  breadcrumbs: {
    marginLeft: '15px',
    '& .MuiBreadcrumbs-separator': {
      color: theme.palette.text.secondary,
    },
  },
  link: {
    fontSize: '20px',
    color: theme.palette.grey[600],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
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
  '/stocks/add': 'Форма создания новой акции',
};

const generateBreadcrumbs = (pathname: string, classes: Classes) => {
  if (pathname.startsWith('/stocks/edit')) {
    return [
      <Link
        key="/stocks"
        component={NavLink}
        to="/stocks"
        className={classes.link}
      >
        Акции
      </Link>,
      <Typography key="/stocks/edit" className={classes.title}>
        Форма редактирования акции
      </Typography>,
    ];
  }

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];

  if (pathname === '/') {
    breadcrumbs.push(
      <Typography key="/" className={classes.title}>
        {NavigationNameMap['/']}
      </Typography>,
    );
  } else {
    segments.forEach((segment, index) => {
      const url = `/${segments.slice(0, index + 1).join('/')}`;
      const isLast = index === segments.length - 1;

      if (isLast) {
        breadcrumbs.push(
          <Typography key={url} className={classes.title}>
            {NavigationNameMap[url] || segment}
          </Typography>,
        );
      } else {
        breadcrumbs.push(
          <Link key={url} component={NavLink} to={url} className={classes.link}>
            {NavigationNameMap[url] || segment}
          </Link>,
        );
      }
    });
  }

  return breadcrumbs;
};

const TopBar: React.FC = () => {
  const location = useLocation();
  const { classes } = useStyles();

  return (
    <Box className={classes.topBar}>
      <Box>
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
          {generateBreadcrumbs(location.pathname, classes)}
        </Breadcrumbs>
      </Box>
    </Box>
  );
};

export default TopBar;
