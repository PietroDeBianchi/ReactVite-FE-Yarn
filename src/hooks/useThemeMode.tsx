import { useState, useEffect } from "react";

const THEME_KEY = "dark-mode";

export function useThemeMode() {
    const storedTheme = localStorage.getItem(THEME_KEY);
    const initialMode = storedTheme ? JSON.parse(storedTheme) : false;

    const [darkMode, setDarkMode] = useState<boolean>(initialMode);

    const toggleTheme = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem(THEME_KEY, JSON.stringify(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        localStorage.setItem(THEME_KEY, JSON.stringify(darkMode));
    }, [darkMode]);

    return { darkMode, toggleTheme };
}
