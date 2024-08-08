import { useEffect } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { makeStyles } from 'tss-react/mui';

import departmentStore from 'stores/DepartmentStore';
import { Call } from '@mui/icons-material';

const useStyles = makeStyles()((theme) => ({
  departmentCard: {
    padding: '30px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: '20px',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  departmentCardName: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
  },
  departmentCardAddress: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h6.fontSize,
  },
  departmentCardTel: {
    display: 'flex',
    gap: '5px',
    color: theme.palette.grey[600],
  },
  departmentCardTelIcon: {
    width: '20px',
    height: 'auto',
  },
  doctorCardEditBtn: {
    width: '80%',
    padding: '7px 20px',
  },
}));

const DepartmentsPage = () => {
  const { classes } = useStyles();

  useEffect(() => {
    departmentStore.loadDepartments();
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        {departmentStore.departments.map((department) => (
          <Grid item xs={12} sm={12} lg={6} key={department.id}>
            <Box className={classes.departmentCard}>
              <Typography className={classes.departmentCardName}>
                {department.name}
              </Typography>
              <Divider className="cardDivider" />
              <Typography className={classes.departmentCardAddress}>
                {department.address}
              </Typography>
              <Box className={classes.departmentCardTel}>
                <Call className={classes.departmentCardTelIcon} />
                <Typography>{`Телефон: ${department.tel}`}</Typography>
              </Box>
              {department.longitude && department.latitude ? (
                <>
                  <Button
                    className={classes.doctorCardEditBtn}
                    variant="contained"
                  >
                    Изменить координаты
                  </Button>
                  <Button
                    className={classes.doctorCardEditBtn}
                    variant="contained"
                  >
                    Удалить координаты
                  </Button>
                </>
              ) : (
                <Button
                  className={classes.doctorCardEditBtn}
                  variant="contained"
                >
                  Добавить координаты
                </Button>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default observer(DepartmentsPage);
