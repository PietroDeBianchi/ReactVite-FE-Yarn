import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
import { useCustomTheme } from '../../context/ThemeContext';
import { AppBar, Toolbar, IconButton, useTheme, Box, MenuItem, Menu, Avatar } from '@mui/material';
import {
    AccountCircle,
    Brightness4,
    Brightness7,
    Logout,
    Menu as MenuIcon,
} from '@mui/icons-material';

// Configuration
const TOPBAR_CONFIG = {
    styles: {
        appBar: {
            background: {
                light: 'rgba(255, 255, 255, 0.8)',
                dark: 'rgba(19, 47, 76, 0.8)',
            },
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease-in-out',
        },
        avatar: {
            size: 32,
        },
    },
} as const;

// Types
interface TopbarProps {
    topbarHeight: string;
    sidebarWidth: string;
    isMobile: boolean;
    onSidebarOpen?: () => void;
}

/**
 * Topbar component provides navigation and user controls
 * Includes theme toggle, user menu, and mobile sidebar toggle
 */
const Topbar = ({ topbarHeight, sidebarWidth, isMobile, onSidebarOpen }: TopbarProps) => {
    // Hooks
    const navigate = useNavigate();
    const theme = useTheme();
    const { logout } = UseAuth();
    const { darkMode, toggleTheme } = useCustomTheme();
    
    // State management
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Event handlers
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path: string) => {
        handleMenuClose();
        navigate(path);
    };

    return (
        <AppBar
            sx={{
                width: !isMobile ? `calc(100% - ${sidebarWidth})` : '100%',
                height: topbarHeight,
                background: theme.palette.mode === 'light' 
                    ? TOPBAR_CONFIG.styles.appBar.background.light 
                    : TOPBAR_CONFIG.styles.appBar.background.dark,
                color: theme.palette.text.primary,
                boxShadow: 'none',
                backdropFilter: TOPBAR_CONFIG.styles.appBar.backdropFilter,
                transition: TOPBAR_CONFIG.styles.appBar.transition,
            }}
        >
            <Toolbar
                sx={{ 
                    display: 'flex', 
                    justifyContent: !isMobile ? 'flex-end' : 'space-between' 
                }}
            >
                {/* Mobile Menu Button */}
                {isMobile && (
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{ color: theme.palette.text.primary }}
                        aria-label="open sidebar"
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* User Menu */}
                <Box>
                    <IconButton 
                        onClick={handleMenuOpen} 
                        sx={{ color: theme.palette.text.primary }}
                        aria-label="user menu"
                    >
                        <Avatar 
                            sx={{ 
                                width: TOPBAR_CONFIG.styles.avatar.size, 
                                height: TOPBAR_CONFIG.styles.avatar.size 
                            }} 
                        />
                    </IconButton>
                    <Menu 
                        anchorEl={anchorEl} 
                        open={open} 
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            // Styling the menu
                            '& .MuiPaper-root': {
                                backgroundColor: theme.palette.background.default,
                                borderRadius: 2,
                            },
                        }}
                    >
                        <MenuItem onClick={() => handleNavigation('/profile')} sx={{mx: 0.5, borderRadius: 2}}>
                            <AccountCircle sx={{ mr: 1, color: theme.palette.text.primary }} />
                            Profile
                        </MenuItem>
                        <MenuItem onClick={toggleTheme} sx={{mx: 0.5, borderRadius: 2}}>
                            {darkMode ? (
                                <Brightness7 sx={{ mr: 1, color: theme.palette.text.primary }} />
                            ) : (
                                <Brightness4 sx={{ mr: 1, color: theme.palette.text.primary }} />
                            )}
                            Theme
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                logout();
                                handleNavigation('/');
                            }}
                            sx={{mx: 0.5, borderRadius: 2}}
                        >
                            <Logout sx={{ mr: 1 }} />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
