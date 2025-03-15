import { createTheme, ThemeOptions } from "@mui/material/styles";

// Palette Light Mode
const lightPalette: ThemeOptions = {
    palette: {
        mode: "light",
        background: {
            default: "#F8FAFC",  // Bianco sporco
            paper: "#E8EDF2",    // Grigio chiarissimo
        },
        text: {
            primary: "#2E3A47",  
            secondary: "#4D5A65", 
        },
        primary: {
            main: "#A0D8EF",  // Azzurrino pastello
            light: "#C2E7FF",
            dark: "#78B6D9",
        },
        secondary: {
            main: "#A3D9A5",  // Verde pastello
            light: "#C5EAC8",
            dark: "#78B07F",
        },
        success: {
            main: "#28C76F",
        },
        warning: {
            main: "#FFA726",
        },
        error: {
            main: "#EF5350",
        },
        info: {
            main: "#42A5F5",
        },
    },
};

// Palette Dark Mode
const darkPalette: ThemeOptions = {
    palette: {
        mode: "dark",
        background: {
            default: "#1A202C",  // Grigio molto scuro
            paper: "#2D3748",    // Grigio medio scuro
        },
        text: {
            primary: "#E0E6ED",  
            secondary: "#BFC8D6", 
        },
        primary: {
            main: "#7AB7D8",  // Azzurrino pastello più scuro
            light: "#A0D8EF",
            dark: "#4D8EB5",
        },
        secondary: {
            main: "#7AAE7D",  // Verde pastello più scuro
            light: "#A3D9A5",
            dark: "#4D7A55",
        },
        success: {
            main: "#28C76F",
        },
        warning: {
            main: "#FFA726",
        },
        error: {
            main: "#EF5350",
        },
        info: {
            main: "#42A5F5",
        },
    },
};

// Esportiamo i temi
export const lightTheme = createTheme(lightPalette);
export const darkTheme = createTheme(darkPalette);
