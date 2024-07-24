import {
  Backdrop,
  Button,
  Divider,
  Fade,
  Modal,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { makeStyles } from 'tss-react/mui';

import PromoCardInfoProps from 'types/Promo/PromoCardInfoProps';

const useStyles = makeStyles()((theme) => ({
  modalBox: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '611px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    padding: '80px',
    borderRadius: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  modalText: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    marginBottom: '35px',
  },
  modalBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: '10px',
  },
  modalBtn: {
    fontSize: theme.typography.h3.fontSize,
    width: '100%',
  },
  promoCardImg: {
    width: '343px',
    height: '192',
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
  promoCardFullDescription: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    fontWeight: theme.typography.body1.fontWeight,
  },
  promoCardCommonDescription: {
    color: theme.palette.grey[600],
  },
}));

const PromoCardInfo: React.FC<PromoCardInfoProps> = (props) => {
  const { classes } = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 800,
        },
      }}
    >
      <Fade in={props.open}>
        <Box className={classes.modalBox}>
          <Box
            className={classes.promoCardImg}
            component="img"
            src="/img/promoImg.jpg"
            alt={`${props.img}`}
          />
          <Typography className={classes.promoCardTitle}>
            {props.title}
          </Typography>
          <Divider className={classes.promoCardDivider} />
          <Typography className={classes.promoCardFullDescription}>
            {props.fullDescription}
          </Typography>
          <Typography className={classes.promoCardCommonDescription}>
            Имеются противопоказания. Необходима консультация специалиста.
          </Typography>
          <Box className={classes.modalBtns}>
            <Button
              className={classes.modalBtn}
              variant="contained"
              onClick={props.handleClose}
            >
              Редактировать
            </Button>
            <Button
              className={classes.modalBtn}
              variant="contained"
              onClick={props.handleClose}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PromoCardInfo;
