import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
import { useCustomTheme } from '../../context/ThemeContext';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    useTheme,
    Box,
    MenuItem,
    Menu,
} from '@mui/material';
import {
    AccountCircle,
    Brightness4,
    Brightness7,
    Logout,
    Menu as MenuIcon,
} from '@mui/icons-material';

const Topbar = () => {
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
            position='sticky'
            sx={{
                background: theme.palette.background.default,
                color: theme.palette.text.primary,
                boxShadow: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'background-color 0.3s ease-in-out',
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Titolo */}
                <Typography variant='h6' onClick={() => handleNavigation('/dashboard')}>
                    Admin Panel
                </Typography>

                {/* Logo o Avatar */}
                <Box>
                    {/* Menu di navigazione */}
                    <IconButton onClick={handleMenuOpen} sx={{ color: theme.palette.text.primary }}>
                        <MenuIcon />
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
