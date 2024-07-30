import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import ItemsCardProps from 'types/Items/ItemsCardProps';
import ItemEditForm from 'forms/Item/ItemEditForm';

const useStyles = makeStyles()((theme) => ({
  editFormBox: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    width: '900px',
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
    borderRadius: '20px',
    padding: '20px 50px',
  },
  modalBox: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '900px',
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
}));

interface ItemEditFormPageProps {
  open: boolean;
  handleClose: () => void;
  item: ItemsCardProps;
  notify: () => void;
}

const ItemEditFormPage = ({
  open,
  handleClose,
  item,
  notify,
}: ItemEditFormPageProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.editFormBox}>
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
            <ItemEditForm
              open={open}
              handleClose={handleClose}
              item={item}
              notify={notify}
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ItemEditFormPage;
