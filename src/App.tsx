import "./styles/global.css";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./theme/theme";
import AppRouter from "./router/Router";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useCustomTheme } from "./context/ThemeContext";

function ThemedApp() {
    const { darkMode } = useCustomTheme();
    return (
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </MuiThemeProvider>
    );
}

function App() {
    return (
        <ThemeProvider>
            <ThemedApp />
        </ThemeProvider>
    );
}

export default App;
