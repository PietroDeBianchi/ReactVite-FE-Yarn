import { useCustomTheme } from '../../context/ThemeContext';
import { Outlet } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import logoExpanded from '../../assets/logo/logo.png';

const PublicRoute = () => {
    const { darkMode, toggleTheme } = useCustomTheme();
    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            <Box
                component='img'
                src={logoExpanded}
                alt='ADAPT'
                sx={{
                    height: '64px',
                    position: 'absolute',
                    top: 16,
                    left: 16,
                }}
            />
            <IconButton
                onClick={toggleTheme}
                color={darkMode ? 'default' : 'inherit'}
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                }}
            >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <Outlet />
        </Box>
    );
};

export default PublicRoute;
