import { Outlet } from 'react-router-dom';
import { useCustomTheme } from '../../context/ThemeContext';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import logoExpanded from '../../assets/logo/logo.png';

// Layout configuration
const LAYOUT_CONFIG = {
    header: {
        height: {
            mobile: '36px',
            desktop: '64px',
        },
        padding: 2,
    },
    breakpoints: {
        mobile: '(max-width: 600px)',
    },
} as const;

/**
 * PublicRoute component handles public routes with theme switching functionality
 * and responsive header layout
 */
const PublicRoute = () => {
    const { darkMode, toggleTheme } = useCustomTheme();
    const isMobile = useMediaQuery(LAYOUT_CONFIG.breakpoints.mobile);

    // Compute header height based on viewport size
    const headerHeight = isMobile 
        ? LAYOUT_CONFIG.header.height.mobile 
        : LAYOUT_CONFIG.header.height.desktop;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            {/* Header with logo and theme toggle */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: headerHeight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: LAYOUT_CONFIG.header.padding,
                }}
            >
                {/* Logo */}
                <Box
                    component='img'
                    src={logoExpanded}
                    alt='ADAPT'
                    sx={{
                        height: '100%',
                    }}
                />

                {/* Theme toggle button */}
                <IconButton 
                    onClick={toggleTheme} 
                    color={darkMode ? 'default' : 'inherit'}
                    aria-label="toggle theme"
                >
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Box>

            {/* Main content area */}
            <Outlet />
        </Box>
    );
};

export default PublicRoute;
