// HOOKS
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
import { useTheme, Box, List, IconButton, Drawer, Divider } from '@mui/material';
import { Dashboard, AccountCircle, Logout, Close } from '@mui/icons-material';
// COMPONENTS
import NavItem from '../navItem/NavItem';
// ASSETS
import logoExpanded from '../../assets/logo/logo.png';

interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
    const theme = useTheme();
    const { logout } = UseAuth();
    const navigate = useNavigate();

    const handleNavigation = (path: string, isLogout: boolean = false) => {
        onClose(); // Close the sidebar on any navigation
        if (!isLogout) {
            navigate(path);
        } else {
            logout();
            navigate('/');
        }
    };

    const menuItems = [
        { icon: <Dashboard />, text: 'Dashboard', path: '/dashboard' },
        { icon: <AccountCircle />, text: 'Profile', path: '/profile' },
        {
            icon: <Logout />,
            text: 'Logout',
            path: '/',
            isLogout: true,
        },
    ];

    return (
        <Drawer anchor='left' open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 200,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box
                        component='img'
                        src={logoExpanded}
                        alt='ADAPT'
                        onClick={() => handleNavigation('/dashboard')}
                        sx={{ height: 40, cursor: 'pointer' }}
                    />
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </Box>

                <Divider />

                <List>
                    {menuItems.map((item, index) => (
                        <NavItem
                            key={index}
                            item={item}
                            isExpanded={true}
                            onClick={() => handleNavigation(item.path, item.isLogout)}
                        />
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default MobileSidebar;
