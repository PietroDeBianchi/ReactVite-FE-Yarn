// HOOKS
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
// CONFIG
import { AppRoutes } from '../../router/routesConfig';
// MUI
import { useTheme, Box, List, IconButton, Drawer, Divider, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
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

interface MobileSidebarProps {
    open: boolean;
    onClose: () => void;
}

// CONST
const mainRoutes = AppRoutes.filter((route) => !route.isLogout);
const logoutRoute = AppRoutes.find((route) => route.isLogout);

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
    const theme = useTheme();
    const { logout } = UseAuth();
    const navigate = useNavigate();

    const handleNavigation = (path: string, isLogout: boolean = false) => {
        onClose();
        if (!isLogout) {
            navigate(path);
        } else {
            logout();
        }
    };

    return (
        <Drawer anchor={MOBILE_SIDEBAR_CONFIG.drawer.anchor} open={open} onClose={onClose}>
            <Box
                sx={{
                    width: MOBILE_SIDEBAR_CONFIG.drawer.width,
                    height: '100%',
                    ...MOBILE_SIDEBAR_CONFIG.styles.container,
                    backgroundColor: theme.palette.background.default,
                }}
            >
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
                            cursor: 'pointer',
                        }}
                    />
                    <IconButton onClick={onClose} aria-label='close sidebar'>
                        <Close />
                    </IconButton>
                </Box>

                <Divider />

                <List sx={{...MOBILE_SIDEBAR_CONFIG.styles.container, height: '100% '}}>
                    <Stack sx={{ flexGrow: 1 }}>
                        {mainRoutes.map((item, index) => (
                            <NavItem
                                key={index}
                                item={item}
                                onClick={() => handleNavigation(item.path)}
                            />
                        ))}
                    </Stack>

                    {/* Logout sempre in fondo */}
                    {logoutRoute && (
                        <Stack sx={{ mb: 1, alignItems: 'center' }}>
                            <NavItem
                                item={logoutRoute}
                                isLogout={true}
                                onClick={() => handleNavigation(logoutRoute.path, true)}
                            />
                        </Stack>
                    )}
                </List>
            </Box>
        </Drawer>
    );
};

export default MobileSidebar;
