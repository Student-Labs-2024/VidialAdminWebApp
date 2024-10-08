import { createTheme } from '@mui/material';

import '../../public/fonts/fonts.css';

const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: '#97001E',
      dark: '#750015',
    },
    secondary: {
      main: '#FFFFFF',
    },
    grey: {
      600: '#999999',
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#000000',
    },
  },
  typography: {
    fontFamily: ['Rubik', 'sans-serif'].join(','),
    h1: {
      fontSize: '30px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 700,
    },
  },
});

const ExtendedDefaultTheme = createTheme(DefaultTheme, {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: '100vh',
          backgroundColor: DefaultTheme.palette.primary.main,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-root': {
            color: 'black',
            ':hover:not(.Mui-focused)': {
              '&:before': {
                borderColor: DefaultTheme.palette.grey[600],
                borderWidth: '2px',
              },
            },
            ':hover.Mui-error': {
              '&:before': {
                borderColor: '#97001E80',
                borderWidth: '2px',
              },
            },
          },
          '& .MuiFormLabel-root': {
            color: DefaultTheme.palette.grey[600],
            fontWeight: 700,
          },
          width: '100%',
          marginBottom: '25px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '18px',
          fontWeight: 700,
          borderRadius: '30px',
          textTransform: 'none',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: DefaultTheme.palette.grey[900],
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          color:
            DefaultTheme.palette.primary.main === '#97001E'
              ? '#FFFFFF'
              : DefaultTheme.palette.text.primary,
        },
      },
    },
  },
});

export { ExtendedDefaultTheme as DefaultTheme };
