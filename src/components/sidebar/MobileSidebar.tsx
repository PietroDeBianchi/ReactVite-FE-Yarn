// HOOKS
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
import { useTheme, Box, List, IconButton, Drawer, Divider } from '@mui/material';
import { Dashboard, AccountCircle, Logout, Close } from '@mui/icons-material';
// COMPONENTS
import NavItem from '../navItem/NavItem';
// ASSETS
import logoExpanded from '../../assets/logo/logo.png';

// Configuration
const MOBILE_SIDEBAR_CONFIG = {
    drawer: {
        width: 200,
        anchor: 'left' as const,
    },
    logo: {
        height: 40,
    },
    styles: {
        container: {
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
        },
    },
} as const;

// Types
interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

/**
 * MobileSidebar component provides a responsive navigation drawer for mobile devices
 * Includes logo, navigation items, and user actions
 */
const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
    // Hooks
    const theme = useTheme();
    const { logout } = UseAuth();
    const navigate = useNavigate();

    // Navigation handler
    const handleNavigation = (path: string, isLogout: boolean = false) => {
        onClose(); // Close the sidebar on any navigation
        if (!isLogout) {
            navigate(path);
        } else {
            logout();
            navigate('/');
        }
    };

    // Navigation items configuration
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
        <Drawer 
            anchor={MOBILE_SIDEBAR_CONFIG.drawer.anchor} 
            open={open} 
            onClose={onClose}
        >
            <Box
                sx={{
                    width: MOBILE_SIDEBAR_CONFIG.drawer.width,
                    height: '100%',
                    ...MOBILE_SIDEBAR_CONFIG.styles.container,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                {/* Header with Logo */}
                <Box
                    sx={{
                        ...MOBILE_SIDEBAR_CONFIG.styles.header,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box
                        component='img'
                        src={logoExpanded}
                        alt='ADAPT'
                        onClick={() => handleNavigation('/dashboard')}
                        sx={{ 
                            height: MOBILE_SIDEBAR_CONFIG.logo.height, 
                            cursor: 'pointer' 
                        }}
                    />
                    <IconButton 
                        onClick={onClose}
                        aria-label="close sidebar"
                    >
                        <Close />
                    </IconButton>
                </Box>

                <Divider />

                {/* Navigation Items */}
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
