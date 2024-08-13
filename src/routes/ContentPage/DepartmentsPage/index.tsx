import { useEffect, useState } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { makeStyles } from 'tss-react/mui';

import departmentStore from 'stores/DepartmentStore';
import { Call } from '@mui/icons-material';
import { Slide, toast } from 'react-toastify';
import DepartmentCardProps from 'types/Department/DepartmentCardProps';
import WarningWindowDelete from 'components/WarningWindowDelete';
import DepartmentNewForm from 'forms/Department/DepartmentNewForm';
import DepartmentEditForm from 'forms/Department/DepartmentEditForm';

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
  departmentCardEditBtn: {
    width: '80%',
    padding: '7px 20px',
  },
}));

const DepartmentsPage = () => {
  const { classes } = useStyles();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openAddCoordinatesModal, setOpenAddCoordinatesModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const { selectedDepartment, departments } = departmentStore;

  useEffect(() => {
    departmentStore.loadDepartments();
  }, []);

  const handleConfirmDelete = () => {
    if (selectedDepartment) {
      departmentStore.deleteDepartmentCoordinates(selectedDepartment.id);
      departmentStore.saveDepartments();
      departmentStore.clearSelectedDepartment();
      toast.success('Координаты удалены!', { transition: Slide });
    }
    setOpenModalDelete(false);
  };

  const handleOpenModalDelete = (department: DepartmentCardProps) => {
    departmentStore.selectDepartment(department);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenAddCoordinatesModal = (department: DepartmentCardProps) => {
    departmentStore.selectDepartment(department);
    setOpenAddCoordinatesModal(true);
  };

  const handleCloseAddCoordinatesModal = () => {
    setOpenAddCoordinatesModal(false);
    departmentStore.clearSelectedDepartment();
  };

  const handleOpenModalEdit = (department: DepartmentCardProps) => {
    departmentStore.selectDepartment(department);
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
    departmentStore.clearSelectedDepartment();
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {departments.map((department) => (
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
                    className={classes.departmentCardEditBtn}
                    variant="contained"
                    onClick={() => handleOpenModalEdit(department)}
                  >
                    Изменить координаты
                  </Button>
                  <Button
                    className={classes.departmentCardEditBtn}
                    variant="contained"
                    onClick={() => handleOpenModalDelete(department)}
                  >
                    Удалить координаты
                  </Button>
                </>
              ) : (
                <Button
                  className={classes.departmentCardEditBtn}
                  variant="contained"
                  onClick={() => handleOpenAddCoordinatesModal(department)}
                >
                  Добавить координаты
                </Button>
              )}
            </Box>
          </Grid>
        ))}
        <WarningWindowDelete
          open={openModalDelete}
          handleClose={handleCloseModalDelete}
          handleConfirm={handleConfirmDelete}
          text="Вы действительно хотите удалить координаты данного филиала?"
        />
        <DepartmentNewForm
          open={openAddCoordinatesModal}
          handleClose={handleCloseAddCoordinatesModal}
        />
        {selectedDepartment && (
          <DepartmentEditForm
            open={openModalEdit}
            handleClose={handleCloseModalEdit}
            department={selectedDepartment!}
          />
        )}
      </Grid>
    </Box>
  );
};

export default observer(DepartmentsPage);
