import {
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Modal,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import PromoCardInfoProps from 'types/Promo/PromoCardInfoProps';
import WarningWindowDelete from 'components/WarningWindowDelete';
import promoStore from 'stores/PromoStore';

const useStyles = makeStyles()((theme) => ({
  modalBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    padding: '30px 80px',
    borderRadius: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
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
    width: '200px',
    height: '200px',
    borderRadius: '20px',
  },
  promoCardTitle: {
    color: theme.palette.text.secondary,
    fontSize: '18px',
    fontWeight: theme.typography.h2.fontWeight,
    textAlign: 'center',
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
  promoCardDate: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
  },
  promoCardCommonDescription: {
    color: theme.palette.grey[600],
  },
}));

const PromoCardInfo = ({
  open,
  handleClose,
  handleConfirmDelete,
  photo,
  title,
  description,
  start_date,
  end_date,
}: PromoCardInfoProps) => {
  const { classes } = useStyles();
  const [openModal, setOpen] = useState(false);

  const handleOpenWindow = () => {
    setOpen(true);
  };

  const handleCloseWindow = () => {
    setOpen(false);
  };

  const handleConfirmDeleted = () => {
    setOpen(false);
    handleConfirmDelete();
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open} timeout={{ enter: 300, exit: 900 }}>
          <Box id="transition-modal-title" className={classes.modalBox}>
            <Box
              className={classes.promoCardImg}
              component="img"
              src={photo}
              alt={`${photo}`}
            />
            <Typography className={classes.promoCardTitle}>{title}</Typography>
            <Divider className={classes.promoCardDivider} />
            <Typography className={classes.promoCardFullDescription}>
              {description}
            </Typography>
            <Divider className={classes.promoCardDivider} />
            <Typography
              className={classes.promoCardDate}
            >{`Акция проводится с ${String(start_date)} по ${end_date}`}</Typography>
            <Divider className={classes.promoCardDivider} />
            <Typography className={classes.promoCardCommonDescription}>
              Имеются противопоказания. Необходима консультация специалиста.
            </Typography>
            <Box className={classes.modalBtns}>
              <Button
                className={classes.modalBtn}
                variant="contained"
                onClick={handleOpenWindow}
              >
                {promoStore.isLoading ? (
                  <CircularProgress sx={{ color: 'white' }} size={36} />
                ) : (
                  'Удалить'
                )}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <WarningWindowDelete
        open={openModal}
        handleClose={handleCloseWindow}
        handleConfirm={handleConfirmDeleted}
        text="Вы действительно хотите удалить данную акцию?"
      />
    </>
  );
};

export default PromoCardInfo;
