import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router';

import DefaultTheme from 'theme/DefaultTheme';

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
  const colors = DefaultTheme.palette;
  const location = useLocation();

  return (
    <Box
      sx={{
        width: '100%',
        height: '75px',
        backgroundColor: colors.secondary.main,
        boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
        borderRadius: '20px',
        marginBottom: '25px',
        paddingLeft: '25px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        color={colors.text.secondary}
        sx={{
          fontSize: '20px',
        }}
      >
        {NavigationNameMap[location.pathname]}
      </Typography>
    </Box>
  );
};

export default TopBar;
