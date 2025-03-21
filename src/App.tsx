import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import AppRouter from './router/Router';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useCustomTheme } from './context/ThemeContext';

function ThemedApp() {
    const { darkMode } = useCustomTheme();
    return (
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <AppRouter />
        </MuiThemeProvider>
    );
}

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <ThemedApp />
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
