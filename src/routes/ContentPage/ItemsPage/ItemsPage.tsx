import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import InputSearch from '../components/InputSearch';

const useStyles = makeStyles()((theme) => ({
  promosBtns: {
    display: 'flex',
    gap: '25px',
    height: '45px',
    width: '100%',
    marginBottom: '25px',
  },
}));

const ItemPage = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.promosBtns}>
      <InputSearch />
    </Box>
  );
};

export default ItemPage;
