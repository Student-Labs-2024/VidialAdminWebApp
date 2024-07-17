import { createTheme } from "@mui/material";
import '../../public/fonts/fonts.css'


let DefaultTheme = createTheme({
    palette: {
        primary: {
            main: '#97001E',
            dark: '#750015',
        }
        ,
        secondary: {
            main: '#FFFFFF',
        },
        grey: {
            600: '#999999',

        },
        background: {
            default: '#F5F5F5',
        }
        ,
        text: {
            primary: '#FFFFFF',
            secondary: '#000000',
        }
    }
});

DefaultTheme = createTheme(DefaultTheme, {
    typography: {
        fontFamily: [
            'Rubik', 'sans-serif'
        ].join(','),
        h1: {
            fontSize: '30px',
            fontWeight: 700,
        },
    }
})

DefaultTheme = createTheme(DefaultTheme, {
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    minHeight: "100vh",
                },
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInput-root": {
                        color: "black",
                        ":hover:not(.Mui-focused)": {
                            "&:before": {
                                borderColor: "grey",
                                borderWidth: "2px",
                            },
                        },
                        ":hover.Mui-error": {
                            "&:before": {
                                borderColor: "#97001E80",
                                borderWidth: "2px",
                            },
                        },
                    },
                    "& .MuiFormLabel-root": {
                        color: "grey",
                        fontWeight: 700
                    },
                    width: "100%",
                    marginBottom: "25px",
                },
            }
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

            }
        }
    }
})

export default DefaultTheme;
