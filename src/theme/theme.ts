import { createTheme, ThemeOptions } from "@mui/material/styles";

// Palette Light Mode ottimizzata per maggiore contrasto
const lightPalette: ThemeOptions = {
    palette: {
        mode: "light",
        background: {
            default: "#E8EFF1", // Sfondo più delicato per migliore contrasto
            paper: "#FFFFFF",   // Bianco puro per chiarezza massima
        },
        text: {
            primary: "#112D3C",   // Blu scuro intenso per alto contrasto
            secondary: "#4B5563", // Grigio medio bilanciato
        },
        primary: {
            main: "#146AFF", 
            light: "#1808FF",
            dark: "#205681",
        },
        secondary: {
            main: "#FF6F61",
            light: "#FF998A",
            dark: "#E55B50",
        },
        success: {
            main: "#28B463",  // Verde vivace, leggermente più scuro
        },
        warning: {
            main: "#F39C12",  // Arancione dorato per avvisi più visibili
        },
        error: {
            main: "#E74C3C",  // Rosso acceso per gli errori
        },
        info: {
            main: "#3498DB",  // Blu brillante per informazioni
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
