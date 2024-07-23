import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import mainPageBoxes from './MainPageBoxes';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
  },
  container: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    height: 'auto',
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: '20px',
    padding: '23px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  welcomeText: {
    textAlign: 'center',
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.palette.text.secondary,
    marginBottom: '25px',
    padding: '0 20px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px',
  },
  mainBox: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '20px',
    width: '65%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px 70px',
  },
  listItem: {
    justifyContent: 'center',
  },
  titleTypography: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
  },
  listItemText: {
    listStyleType: 'disk',
  },
  childText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    '& > *::before': {
      content: '"•"',
      color: theme.palette.text.primary,
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
    },
  },
  childTypography: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight,
  },
}));

const MainPage: React.FC = () => {
  const mainBoxes = mainPageBoxes;
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Typography className={classes.welcomeText}>
          Добро пожаловать в Административную Панель Vidial
        </Typography>
        <List className={classes.list}>
          {mainBoxes.map((box, index) => (
            <Box key={index} className={classes.mainBox}>
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <Box
                    component="img"
                    alt="Hint"
                    src="img/hint.svg"
                    sx={{ width: '40px', height: 'auto' }}
                  />
                </ListItemIcon>
                <Typography className={classes.titleTypography}>
                  {box.title}
                </Typography>
              </ListItem>
              <ListItemText className={classes.listItemText}>
                <Box className={classes.childText}>
                  {Object.values(box.text).map((childText, index) => (
                    <Typography key={index} className={classes.childTypography}>
                      <strong>{childText.title}</strong> {childText.description}
                    </Typography>
                  ))}
                </Box>
              </ListItemText>
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default MainPage;
