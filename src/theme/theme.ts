import { createTheme, ThemeOptions } from "@mui/material/styles";

// Palette Light Mode
const lightPalette: ThemeOptions = {
    palette: {
        mode: "light",
        background: {
            default: "#F7F9FC",  
            paper: "#E5E9F0",    
        },
        text: {
            primary: "#2E3A47",  
            secondary: "#4D5A65", 
        },
        primary: {
            main: "#007AFF",
            light: "#66AFFF",
            dark: "#005BB5",
        },
        secondary: {
            main: "#FF8A65",
            light: "#FFB199",
            dark: "#C75B39",
        },
        success: {
            main: "#28C76F",
        },
        warning: {
            main: "#FF9800",
        },
        error: {
            main: "#FF3D57",
        },
        info: {
            main: "#17A2B8",
        },
    },
};

// Palette Dark Mode
const darkPalette: ThemeOptions = {
    palette: {
        mode: "dark",
        background: {
            default: "#121926",  
            paper: "#252F3E",    
        },
        text: {
            primary: "#D1D5DB",  
            secondary: "#A3ACB9", 
        },
        primary: {
            main: "#0A84FF",  
            light: "#66B2FF",
            dark: "#005BBB",
        },
        secondary: {
            main: "#FF7043",
            light: "#FFA07A",
            dark: "#C75B39",
        },
        success: {
            main: "#28C76F",
        },
        warning: {
            main: "#FF9800",
        },
        error: {
            main: "#FF3D57",
        },
        info: {
            main: "#17A2B8",
        },
    },
};

// Esportiamo i temi
export const lightTheme = createTheme(lightPalette);
export const darkTheme = createTheme(darkPalette);
