import './styles/global.css';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import AppRouter from './router/Router';
import { AuthProvider } from './context/AuthContext';

function App() {
    // Stato per la modalità scura/chiara
    const [darkMode, setDarkMode] = useState(false);
    const toggleTheme = () => setDarkMode((prev) => !prev);
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <AuthProvider>
                <AppRouter toggleTheme={toggleTheme} darkMode={darkMode} />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
