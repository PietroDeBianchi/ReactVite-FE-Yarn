import { createContext, useContext } from "react";
import { useThemeMode } from "../hooks/useThemeMode";

interface ThemeContextProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { darkMode, toggleTheme } = useThemeMode();

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook per usare il tema
export const useCustomTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme deve essere usato dentro un ThemeProvider");
    }
    return context;
};
