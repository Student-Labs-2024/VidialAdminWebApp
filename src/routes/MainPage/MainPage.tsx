import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Sidebar from '../../layouts/SidebarComponents/Sidebar';
import PageContent from '../../layouts/PageContent/PageContent';
import DefaultTheme from '../../theme/DefaultTheme';
import mainPageBoxes from './MainPageBoxes';

const MainPage: React.FC = () => {
  const colors = DefaultTheme.palette;
  const typography = DefaultTheme.typography;
  const mainBoxes = mainPageBoxes;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Sidebar />
      <PageContent>
        <Box
          sx={{
            backgroundColor: colors.secondary.main,
            width: '100%',
            height: 'auto',
            boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
            borderRadius: '20px',
            padding: '23px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: typography.h2,
              fontWeight: typography.h2,
              color: colors.text.secondary,
              marginBottom: '25px',
              padding: '0 20px',
            }}
          >
            Добро пожаловать в Административную Панель Vidial
          </Typography>
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '25px',
            }}
          >
            {mainBoxes.map((box, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: colors.primary.main,
                  borderRadius: '20px',
                  width: '65%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '40px 70px',
                }}
              >
                <ListItem
                  sx={{
                    justifyContent: 'center',
                  }}
                >
                  <ListItemIcon>
                    <Box
                      component="img"
                      alt="Hint"
                      src="img\hint.svg"
                      sx={{ width: '40px', height: 'auto' }}
                    />
                  </ListItemIcon>
                  <Typography
                    sx={{
                      color: colors.text.primary,
                      fontSize: typography.h3,
                      fontWeight: typography.h3,
                    }}
                  >
                    {box.title}
                  </Typography>
                </ListItem>
                <ListItemText
                  sx={{
                    listStyleType: 'disk',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                      '& > *::before': {
                        content: '"•"',
                        color: colors.text.primary,
                        fontWeight: 'bold',
                        display: 'inline-block',
                        width: '1em',
                        marginLeft: '-1em',
                      },
                    }}
                  >
                    {Object.values(box.text).map((childText, index) => (
                      <Typography
                        key={index}
                        sx={{
                          color: colors.text.primary,
                          fontSize: typography.body1.fontSize,
                          fontWeight: typography.body1.fontWeight,
                        }}
                      >
                        <strong>{childText.title}</strong>{' '}
                        {childText.description}
                      </Typography>
                    ))}
                  </Box>
                </ListItemText>
              </Box>
            ))}
          </List>
        </Box>
      </PageContent>
    </Box>
  );
};

export default MainPage;
