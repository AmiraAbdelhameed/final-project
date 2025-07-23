import { createTheme, ThemeProvider } from '@mui/material/styles';
export const theme = createTheme({
    palette: {
        primary: {
            main: "#4A7811",
        },
        secondary: {
            main: "#DAE1D2",
        },
        background: {
            default: "#FEFEFE",
            paper: "#ffffff",
        },
        text: {
            primary: "#000000",
            secondary: "#8F8F8F",
        },
    },
    typography: {
        fontFamily: "Cairo, sans-serif",
     
    },
})

