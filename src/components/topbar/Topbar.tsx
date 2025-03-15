import { useCustomTheme } from '../../context/ThemeContext';
import { AppBar, Toolbar, Typography, IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Topbar = () => {
    const theme = useTheme();
    const { darkMode, toggleTheme } = useCustomTheme();

    return (
        <AppBar
            position='sticky'
            sx={{
                background: theme.palette.background.default,
                color: theme.palette.text.primary,
                boxShadow: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'background-color 0.3s ease-in-out',
            }}
        >
            <Toolbar>
                {/* Titolo */}
                <Typography variant='h6' sx={{ flexGrow: 1 }}>
                    Admin Panel
                </Typography>

                {/* Switch Light/Dark Mode */}
                <IconButton onClick={toggleTheme} color='inherit'>
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
