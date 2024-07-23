import { Box, IconButton, Tooltip } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import InputSearch from '../components/InputSearch';
import { Add } from '@mui/icons-material';

const useStyles = makeStyles()((theme) => ({
  promosBtns: {
    display: 'flex',
    gap: '25px',
    height: '45px',
    width: '100%',
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
}));

const PromosPage = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.promosBtns}>
      <InputSearch />
      <Tooltip title="Добавить акцию" placement="bottom">
        <IconButton sx={{ padding: 0 }}>
          <Add className={classes.iconAdd} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default PromosPage;
