import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, useTheme, Box } from '@mui/material';
import { Dashboard, AccountCircle, Logout } from '@mui/icons-material';
import { UseAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { logout } = UseAuth();
    const logo = null;

    return (
        <List
            sx={{
                background: theme.palette.background.default,
                transition: 'background-color 0.3s ease-in-out',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 2,
                    mb:2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                {logo ? (
                    <Avatar src={logo} alt='Logo' sx={{ width: 80, height: 80 }} />
                ) : (
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: theme.palette.primary.main,
                            fontSize: '2rem',
                        }}
                    >
                        A
                    </Avatar>
                )}
            </Box>
            <ListItem onClick={() => navigate('/dashboard')}>
                <ListItemIcon>
                    <Dashboard sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText primary='Dashboard' sx={{ color: theme.palette.text.primary }} />
            </ListItem>
            <ListItem onClick={() => navigate('/profile')}>
                <ListItemIcon>
                    <AccountCircle sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText primary='Profile' sx={{ color: theme.palette.text.primary }} />
            </ListItem>
            {/* Logout */}
            <ListItem
                onClick={() => {
                    logout();
                    navigate('/');
                }}
            >
                <ListItemIcon>
                    <Logout sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText primary='Logout' sx={{ color: theme.palette.text.primary }} />
            </ListItem>
        </List>
    );
};

export default Sidebar;
