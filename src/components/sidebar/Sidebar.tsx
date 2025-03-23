import { useNavigate } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme,
} from '@mui/material';
import { Dashboard, AccountCircle, Logout } from '@mui/icons-material';
import { UseAuth } from '../../context/AuthContext';

const Sidebar = ({
    sidebarWidth,
    topbarHeight,
}: {
    sidebarWidth: string;
    topbarHeight: string;
}) => {
    const theme = useTheme();
    const { logout } = UseAuth();
    const navigate = useNavigate();

    const handleNavigation = (path: any) => {
        navigate(path);
    };

    return (
        <List
            sx={{
                width: sidebarWidth,
                position: 'fixed',
                top: 0, // Compensate for the topbar height
                left: 0,
                py: 0,
                background: theme.palette.background.default,
                transition: 'background-color 0.3s ease-in-out',
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: topbarHeight,
                    mb: 2,
                    px: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography
                    variant='h5'
                    color='primary'
                    onClick={() => handleNavigation('/dashboard')}
                >
                    A D A P T
                </Typography>
            </Box>
            <ListItem onClick={() => navigate('/dashboard')}>
                <ListItemIcon>
                    <Dashboard sx={{ color: theme.palette.text.primary }} />
                </ListItemIcon>
                <ListItemText primary='Dashboard' sx={{ color: theme.palette.text.primary, fontSize: '2px' }} />
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
