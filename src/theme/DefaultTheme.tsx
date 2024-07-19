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
    }
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          minHeight: '100vh',
          backgroundColor: 'primary.main',
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
                borderColor: 'grey',
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
            color: 'grey',
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
          width: '75%',
          borderRadius: '30px',
          textTransform: 'none',
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#97001E',
          width: '320px',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          '&:hover': {
            backgroundColor: 'white',
            color: '#97001E',
          },
          '&:hover .MuiListItemIcon-root': {
            color: '#97001E',
          },
        },
      },
    },
  },
});

export default DefaultTheme;
