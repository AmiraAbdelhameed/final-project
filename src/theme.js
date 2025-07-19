import { createTheme, ThemeProvider } from '@mui/material/styles';
export const theme = createTheme({
    palette: {
        primary: {
            main: "#A0231F",
        },
        secondary: {
            main: "#EBEBEB",
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
        text: {
            primary: "#000000",
            secondary: "#555555",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h1: {
            fontSize: "2rem",
            fontWeight: 500,
        },
        h2: {
            fontSize: "1.5rem",
            fontWeight: 500,
        },
    },
})

