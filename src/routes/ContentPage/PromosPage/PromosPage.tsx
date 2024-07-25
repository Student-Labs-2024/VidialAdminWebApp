import { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Add, ArrowRightAltOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import PromoCardInfo from './PromoCardInfo';
import InputSearch from '../components/InputSearch';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';
import promoStore from 'stores/PromoStore';

const useStyles = makeStyles()((theme) => ({
  promosBtns: {
    display: 'flex',
    gap: '25px',
    height: '45px',
    width: '100%',
    marginBottom: '25px',
  },
  iconAdd: {
    borderRadius: '30px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    padding: '10px 20px',
    width: '65px',
    height: 'auto',
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
  },
  promoCard: {
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
  promoCardImg: {
    width: '90%',
    height: 'auto',
    borderRadius: '20px',
  },
  promoCardTitle: {
    color: theme.palette.text.secondary,
    fontSize: '18px',
    fontWeight: theme.typography.h2.fontWeight,
  },
  promoCardDivider: {
    color: theme.palette.grey[600],
    width: '100%',
  },
  promoCardDescription: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    fontWeight: theme.typography.body1.fontWeight,
  },
  promoCardBtn: {},
  promoCardEditBtn: {
    width: '80%',
    padding: '7px 20px',
  },
}));

const PromosPage = observer(() => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [selectedPromo, setSelectedPromo] = useState<PromoDataCardProps | null>(
    null,
  );
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleOpenPromo = (promo: PromoDataCardProps) => {
    setSelectedPromo(promo);
  };

  const handleClosePromo = () => {
    setSelectedPromo(null);
  };

  const handleConfirmDelete = () => {
    if (selectedPromo) {
      promoStore.deletePromo(selectedPromo.id);
      setSelectedPromo(null);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    promoStore.loadPromos();
  }, []);

  return (
    <Box>
      <Box className={classes.promosBtns}>
        <InputSearch />
        <Tooltip title="Добавить акцию" placement="bottom">
          <IconButton
            onClick={() => navigate('/stocks/add')}
            sx={{ padding: 0 }}
          >
            <Add className={classes.iconAdd} />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={3}>
        {promoStore.promos.map((promo) => (
          <Grid item xs={12} sm={6} md={4} key={promo.id}>
            <Box className={classes.promoCard}>
              <Box
                className={classes.promoCardImg}
                component="img"
                src={promo.img}
                alt={promo.title}
              />
              <Typography className={classes.promoCardTitle}>
                {promo.title}
              </Typography>
              <Divider className={classes.promoCardDivider} />
              <Typography className={classes.promoCardDescription}>
                {promo.description}
              </Typography>
              <Button
                onClick={() => handleOpenPromo(promo)}
                variant="text"
                endIcon={<ArrowRightAltOutlined />}
                className={classes.promoCardBtn}
              >
                Подробнее
              </Button>
              <Button
                className={classes.promoCardEditBtn}
                variant="contained"
                onClick={() => navigate(`/stocks/edit/${promo.id}`)}
              >
                Редактировать
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      {selectedPromo && (
        <PromoCardInfo
          open={Boolean(selectedPromo)}
          handleClose={handleClosePromo}
          handleConfirmDelete={handleConfirmDelete}
          id={selectedPromo.id}
          img={selectedPromo.img}
          title={selectedPromo.title}
          fullDescription={selectedPromo.fullDescription}
          startDate={selectedPromo.startDate}
          endDate={selectedPromo.endDate}
        />
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="success"
          onClose={handleCloseSnackbar}
          sx={{ width: '100%' }}
        >
          Вы удалили акцию!
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default PromosPage;