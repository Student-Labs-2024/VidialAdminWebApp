import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useState, useEffect } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import itemStore from 'stores/ItemStore';
import ItemEditFormPage from './ItemEditFormPage';
import ItemsCardProps from 'types/Items/ItemsCardProps';
import InputSearch from 'components/InputSearch';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  promosBtns: {
    display: 'flex',
    gap: '25px',
    height: '45px',
    width: '100%',
    marginBottom: '25px',
  },
  itemCards: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  ItemCard: {
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
  itemCardImg: {
    width: '90%',
    height: 'auto',
    borderRadius: '20px',
  },
  itemCardTitle: {
    color: theme.palette.text.secondary,
    fontSize: '18px',
    fontWeight: theme.typography.h2.fontWeight,
  },
  itemCardDivider: {
    color: theme.palette.grey[600],
    width: '100%',
  },
  itemCardDeskAndPrice: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  itemCardDescription: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    fontWeight: theme.typography.body1.fontWeight,
  },
  itemCardPrice: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    fontWeight: theme.typography.h2.fontWeight,
  },
  itemCardEditBtn: {
    width: '80%',
    padding: '7px 20px',
  },
  toastContainer: {
    width: 'auto',
  },
}));

const ItemPage = () => {
  const { classes } = useStyles();
  const [items, setItems] = useState<ItemsCardProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<ItemsCardProps | null>(null);

  const notify = () => {
    toast.success('Вы успешно редактировали данный товар!', {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Slide,
    });
  };

  const handleOpen = (item: ItemsCardProps) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    itemStore.loadItems();
    setItems(itemStore.items);
  }, []);

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.promosBtns}>
          <InputSearch />
        </Box>
        <Grid className={classes.itemCards} container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item.index}>
              <Box className={classes.ItemCard}>
                <Box
                  className={classes.itemCardImg}
                  component="img"
                  src={item.img}
                  alt={item.title}
                />
                <Typography className={classes.itemCardTitle}>
                  {item.title}
                </Typography>
                <Divider className={classes.itemCardDivider} />
                <Box className={classes.itemCardDeskAndPrice}>
                  <Typography className={classes.itemCardPrice}>
                    {`${item.price} ₽`}
                  </Typography>
                  <Typography className={classes.itemCardDescription}>
                    {item.description}
                  </Typography>
                </Box>
                <Button
                  className={classes.itemCardEditBtn}
                  variant="contained"
                  onClick={() => handleOpen(item)}
                >
                  Редактировать
                </Button>
              </Box>
            </Grid>
          ))}
          {selectedItem && (
            <ItemEditFormPage
              open={!!selectedItem}
              handleClose={handleClose}
              item={selectedItem}
              notify={notify}
            />
          )}
        </Grid>
      </Box>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className={classes.toastContainer}
      />
    </>
  );
};

export default ItemPage;
