import { createTheme, ThemeOptions } from "@mui/material/styles";

// Palette Light Mode
const lightPalette: ThemeOptions = {
    palette: {
        mode: "light",
        background: {
            default: "#F4F7F6",  // Bianco sporco moderno
            paper: "#FFFFFF",    // Bianco puro e pulito
        },
        text: {
            primary: "#1F2937",  // Grigio scuro, quasi antracite
            secondary: "#4B5563", // Grigio medio
        },
        primary: {
            main: "#6BCB77",  // Verde menta fresco
            light: "#90D7A0",
            dark: "#4EA461",
        },
        secondary: {
            main: "#FF6F61",  // Corallo vibrante
            light: "#FF998A",
            dark: "#E55B50",
        },
        success: {
            main: "#2ECC71",  // Verde vivace e positivo
        },
        warning: {
            main: "#F1C40F",  // Giallo dorato moderno
        },
        error: {
            main: "#E74C3C",  // Rosso acceso per gli errori
        },
        info: {
            main: "#3498DB",  // Blu brillante per le informazioni
        },
    },
};

// Palette Dark Mode
const darkPalette: ThemeOptions = {
    palette: {
        mode: "dark",
        background: {
            default: "#0C2130",  // Navy profondo
            paper: "#112D3C",    // Blu notte leggermente più chiaro
        },
        text: {
            primary: "#D0E2F2",  // Blu pallido per un contrasto morbido
            secondary: "#A0B4C6", // Tonalità grigio-bluata
        },
        primary: {
            main: "#A8FF9A",  // Neon green per un accento vivace
            light: "#B8FFB8",
            dark: "#8AD88A",
        },
        secondary: {
            main: "#044737",  // Verde scuro elegante
            light: "#0A6E52",
            dark: "#022F22",
        },
        success: {
            main: "#36D7B7",  // Turchese fresco per successi
        },
        warning: {
            main: "#FFC107",  // Ambra luminosa per i warning
        },
        error: {
            main: "#FF5252",  // Rosso intenso per gli errori
        },
        info: {
            main: "#29B6F6",  // Blu chiaro per le informazioni
        },
    },
};

// Esportiamo i temi
export const lightTheme = createTheme(lightPalette);
export const darkTheme = createTheme(darkPalette);
