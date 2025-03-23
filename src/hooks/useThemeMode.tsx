import { useState, useEffect } from "react";

// Configuration
const THEME_CONFIG = {
    storage: {
        key: "dark-mode",
    },
    default: {
        darkMode: false,
    },
} as const;

/**
 * Custom hook for managing theme mode (dark/light)
 * Persists theme preference in localStorage
 * @returns {Object} Object containing darkMode state and toggleTheme function
 */
export function useThemeMode() {
    // Initialize state from localStorage or default value
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const storedTheme = localStorage.getItem(THEME_CONFIG.storage.key);
        return storedTheme ? JSON.parse(storedTheme) : THEME_CONFIG.default.darkMode;
    });

    // Toggle theme mode and update localStorage
    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem(THEME_CONFIG.storage.key, JSON.stringify(newMode));
            return newMode;
        });
    };

    // Sync localStorage with state changes
    useEffect(() => {
        localStorage.setItem(THEME_CONFIG.storage.key, JSON.stringify(darkMode));
    }, [darkMode]);

    return { darkMode, toggleTheme };
}
