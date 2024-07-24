import {
  Box,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Add, ArrowRightAltOutlined } from '@mui/icons-material';
import { useState } from 'react';

import InputSearch from '../components/InputSearch';
import { promoDataCards } from './PromoDataCard';
import PromoCardInfo from './PromoCardInfo';
import PromoDataCardProps from 'types/Promo/PromoDataCardProps';

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
    width: '100%',
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
  },
}));

const PromosPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<PromoDataCardProps | null>(
    null,
  );
  const { classes } = useStyles();
  const promosCards = promoDataCards;

  const handleOpen = (promo: PromoDataCardProps) => {
    setSelectedPromo(promo);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedPromo(null);
    setOpen(false);
  };

  return (
    <Box>
      <Box className={classes.promosBtns}>
        <InputSearch />
        <Tooltip title="Добавить акцию" placement="bottom">
          <IconButton sx={{ padding: 0 }}>
            <Add className={classes.iconAdd} />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={3}>
        {promosCards.map((promo) => (
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
                onClick={() => handleOpen(promo)}
                variant="text"
                endIcon={<ArrowRightAltOutlined />}
                className={classes.promoCardBtn}
              >
                Подробнее
              </Button>
              <Button className={classes.promoCardEditBtn} variant="contained">
                Редактировать
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      {selectedPromo && (
        <PromoCardInfo
          open={open}
          handleClose={handleClose}
          id={selectedPromo.id}
          img={selectedPromo.img}
          title={selectedPromo.title}
          fullDescription={selectedPromo.fullDescription}
        />
      )}
    </Box>
  );
};

export default PromosPage;
