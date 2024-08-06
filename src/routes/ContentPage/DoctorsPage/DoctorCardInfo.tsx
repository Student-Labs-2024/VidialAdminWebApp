import { useState } from 'react';
import {
  Avatar,
  Backdrop,
  Button,
  Divider,
  Fade,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from 'tss-react/mui';
import { Close } from '@mui/icons-material';
import { Slide, toast } from 'react-toastify';

import WarningWindowDelete from 'components/WarningWindowDelete';
import DoctorCardInfoProps from 'types/Doctor/DoctorCardInfoProps';
import { DoctorTimeSlot } from 'types/Doctor/DoctorCardProps';

const useStyles = makeStyles()((theme) => ({
  modalBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '660px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    padding: '30px 80px',
    borderRadius: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
  },
  modalText: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    marginBottom: '35px',
  },
  modalBtn: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  promoCardImg: {
    width: '200px',
    height: '200px',
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
  timeSlot: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '10px',
  },
  timeSlotItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '10px',
    padding: '10px',
    backgroundColor: 'none',
    color: theme.palette.text.secondary,
  },
  timeCapsule: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    marginTop: '10px',
  },
  timeCapsuleItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px',
    color: 'white',
  },
}));

const groupByDate = (slots: DoctorTimeSlot[]) => {
  return slots.reduce(
    (grouped: { [key: string]: DoctorTimeSlot[] }, slot: DoctorTimeSlot) => {
      const date = new Date(slot.time).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
      return grouped;
    },
    {},
  );
};

const DoctorCardInfo = ({
  open,
  handleClose,
  handleConfirmDelete,
  name,
  portrait,
  category,
  time,
}: DoctorCardInfoProps) => {
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

  const handleTimeItemDelete = () => {
    toast.success('Временной слот удален!', { transition: Slide });
  };

  const groupedTimeSlots = groupByDate(time);

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
        <Fade in={open} timeout={{ enter: 300, exit: 300 }}>
          <Box id="transition-modal-title" className={classes.modalBox}>
            <Avatar
              className={classes.promoCardImg}
              src={portrait}
              alt={`${name}`}
            />
            <Typography className="doctorCardName">{name}</Typography>
            <Divider className="cardDivider" />
            <Typography className="doctorCardCategory">{category}</Typography>
            <Divider className="cardDivider" />
            <Typography className="doctorCardName">
              Занятые временные слоты доктора:
            </Typography>
            <Box className={classes.timeSlot}>
              {Object.entries(groupedTimeSlots).map(([date, slots], index) => (
                <Box key={index} className={classes.timeSlotItem}>
                  <Typography>{date}</Typography>
                  <Box className={classes.timeCapsule}>
                    {slots.map((slot, i) => (
                      <Box key={i} className={classes.timeCapsuleItem}>
                        {new Date(slot.time).toLocaleTimeString()}
                        <IconButton onClick={handleTimeItemDelete}>
                          <Close sx={{ color: 'white' }} />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
            <Divider className="cardDivider" />
            <Button
              className={classes.modalBtn}
              variant="contained"
              onClick={handleOpenWindow}
            >
              Удалить
            </Button>
          </Box>
        </Fade>
      </Modal>
      <WarningWindowDelete
        open={openModal}
        handleClose={handleCloseWindow}
        handleConfirm={handleConfirmDeleted}
        text="Вы действительно хотите удалить данного доктора?"
      />
    </>
  );
};

export default DoctorCardInfo;
