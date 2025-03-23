import { ThemeProvider as MuiThemeProvider, GlobalStyles } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import AppRouter from './router/Router';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useCustomTheme } from './context/ThemeContext';

function ThemedApp() {
    const { darkMode } = useCustomTheme();
    return (
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <GlobalStyles
                styles={(theme) => ({
                    body: {
                        backgroundColor: theme.palette.background.paper,
                        margin: 0,
                        padding: 0,
                        boxSizing: 'border-box',
                    },
                })}
            />
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
