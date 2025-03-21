import { createTheme, ThemeOptions } from "@mui/material/styles";

// Palette Light Mode ottimizzata per maggiore contrasto e comfort visivo
const lightPalette: ThemeOptions = {
    palette: {
        mode: "light",
        background: {
            default: "#F5F7FA", // Sfondo leggermente più caldo e confortevole
            paper: "#FFFFFF",   // Bianco puro per chiarezza massima
        },
        text: {
            primary: "#1A2B3C",   // Blu scuro più ricco per migliore leggibilità
            secondary: "#4A5568", // Grigio più scuro per migliore contrasto
        },
        primary: {
            main: "#2563EB",     // Blu più morbido ma ancora vivace
            light: "#3B82F6",
            dark: "#1D4ED8",
        },
        secondary: {
            main: "#E85D5D",     // Coral più morbido e armonioso
            light: "#F87171",
            dark: "#DC2626",
        },
        success: {
            main: "#059669",     // Verde più professionale
        },
        warning: {
            main: "#D97706",     // Arancione più caldo e meno acuto
        },
        error: {
            main: "#DC2626",     // Rosso più sofisticato
        },
        info: {
            main: "#0284C7",     // Blu più profondo per le informazioni
        },
    },
};

// Palette Dark Mode ottimizzata per comfort visivo e contrasto
const darkPalette: ThemeOptions = {
    palette: {
        mode: "dark",
        background: {
            default: "#0A1929",  // Blu notte più profondo
            paper: "#132F4C",    // Blu notte più chiaro per migliore contrasto
        },
        text: {
            primary: "#E2E8F0",  // Grigio-blu chiaro per migliore leggibilità
            secondary: "#94A3B8", // Grigio più neutro per testo secondario
        },
        primary: {
            main: "#4ADE80",     // Verde menta più morbido
            light: "#6EE7B7",
            dark: "#059669",
        },
        secondary: {
            main: "#065F46",     // Verde scuro più visibile
            light: "#047857",
            dark: "#064E3B",
        },
        success: {
            main: "#10B981",     // Verde più vivace ma non acuto
        },
        warning: {
            main: "#F59E0B",     // Ambra più calda
        },
        error: {
            main: "#EF4444",     // Rosso più brillante ma non accecante
        },
        info: {
            main: "#3B82F6",     // Blu più luminoso per le informazioni
        },
    },
};

// Esportiamo i temi
export const lightTheme = createTheme(lightPalette);
export const darkTheme = createTheme(darkPalette);
