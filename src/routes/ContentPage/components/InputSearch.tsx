import { InputAdornment, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  inputSearch: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.secondary.main,
      boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
      width: '400px',
      height: '45px',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.main,
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: '1px',
        },
      },
      ':hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[600],
      },
    },
  },
  iconSearch: {
    color: theme.palette.primary.main,
    width: '30px',
    height: 'auto',
  },
}));

const InputSearch = () => {
  const { classes } = useStyles();

  return (
    <TextField
      className={classes.inputSearch}
      id="input-with-icon-textfield"
      placeholder="Поиск"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box
              component="img"
              src="\img\search.svg"
              className={classes.iconSearch}
            />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
};

export default InputSearch;
