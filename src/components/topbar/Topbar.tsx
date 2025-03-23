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

interface TopbarProps {
    topbarHeight: string;
    sidebarWidth: string;
    isMobile: boolean;
    onSidebarOpen?: () => void;
}

const Topbar = ({ topbarHeight, sidebarWidth, isMobile, onSidebarOpen }: TopbarProps) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { logout } = UseAuth();
    const { darkMode, toggleTheme } = useCustomTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleNavigation = (path: any) => {
        handleMenuClose();
        navigate(path);
    };

    return (
        <AppBar
            sx={{
                width: !isMobile ? `calc(100% - ${sidebarWidth})` : '100%',
                height: topbarHeight,
                background:
                    theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.8)'
                        : 'rgba(19, 47, 76, 0.8)',
                color: theme.palette.text.primary,
                boxShadow: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease-in-out',
            }}
        >
            <Toolbar
                sx={{ display: 'flex', justifyContent: !isMobile ? 'flex-end' : 'space-between' }}
            >
                {isMobile && (
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{ color: theme.palette.text.primary }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                {/* Logo o Avatar */}
                <Box>
                    {/* Menu di navigazione */}
                    <IconButton onClick={handleMenuOpen} sx={{ color: theme.palette.text.primary }}>
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                        <MenuItem onClick={() => handleNavigation('/profile')}>
                            <AccountCircle sx={{ mr: 1, color: theme.palette.text.primary }} />
                            Profile
                        </MenuItem>
                        <MenuItem onClick={toggleTheme}>
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
                        >
                            <Logout sx={{ mr: 1, color: theme.palette.text.primary }} />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
