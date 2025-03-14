import { List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { Dashboard, AccountCircle, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../context/AuthContext';

const Sidebar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { logout } = UseAuth();

    return (
        <List sx={{ background: theme.palette.background.default }}>
            {/* Dashboard */}
            <ListItem onClick={() => navigate('/dashboard')}>
                <ListItemIcon>
                    <Dashboard sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText primary='Dashboard' sx={{ color: theme.palette.text.primary }} />
            </ListItem>

            {/* Profile */}
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
