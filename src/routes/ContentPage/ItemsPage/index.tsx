import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import itemStore from 'stores/ItemStore';
import ItemEditFormPage from './ItemEditFormPage';
import ItemsCardProps from 'types/Items/ItemsCardProps';
import InputSearch from 'components/InputSearch';
import Toast from 'components/Toast';

const useStyles = makeStyles()((theme) => ({
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
}));

const ItemPage = () => {
  const { classes } = useStyles();
  const [selectedItem, setSelectedItem] = useState<ItemsCardProps | null>(null);

  const handleOpen = (item: ItemsCardProps) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    itemStore.loadItems();
  }, []);

  return (
    <>
      <Box className="contentBtns">
        <InputSearch />
      </Box>
      <Grid container spacing={3}>
        {itemStore.items.map((item) => (
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
          />
        )}
      </Grid>
      <Toast />
    </>
  );
};

export default observer(ItemPage);
