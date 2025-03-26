// HOOKS
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
// CONFIG
import { AppRoutes } from '../../router/routes/ProtectedRoutes';
// MUI
import { useTheme, Box, List, IconButton, Typography, Stack } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
// COMPONENTS
import NavItem from '../navItem/NavItem';
// ASSETS
import logoExpanded from '../../assets/logo/logo.png';

// Configuration
const SIDEBAR_CONFIG = {
    styles: {
        list: {
            py: 1,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1300,
            cursor: 'pointer',
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
            minHeight: '100vh',
        },
        header: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
            px: 2,
            position: 'relative',
        },
        logo: {
            height: '80%',
            cursor: 'pointer',
        },
        toggleButton: {
            position: 'fixed',
            top: 60.5,
            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        },
    },
    positions: {
        toggleButton: {
            expanded: { left: 140.5 },
            collapsed: { left: 44.5 },
        },
    },
} as const;

// Types
interface SidebarProps {
    sidebarWidth: string;
    topbarHeight: string;
    isExpanded: boolean;
    onToggle: () => void;
}

// CONST
const mainRoutes = AppRoutes.filter((route) => route.isNav) ;
const logoutRoute = AppRoutes.find((route) => route.isLogout);

/**
 * Sidebar component provides navigation for desktop view
 * Includes collapsible functionality, logo, and navigation items
 */
const Sidebar = ({ sidebarWidth, topbarHeight, isExpanded, onToggle }: SidebarProps) => {
    const theme = useTheme();
    const { logout } = UseAuth();
    const navigate = useNavigate();

    const handleNavigation = (path: string, isLogout: boolean = false) => {
        if (!isLogout) {
            navigate(path);
        } else {
            logout();
        }
    };
    console.log(mainRoutes);
    return (
        <List
            sx={{
                width: sidebarWidth,
                position: 'fixed',
                top: 0,
                left: 0,
                background: theme.palette.background.default,
                borderRight: `1px solid ${theme.palette.divider}`,
                ...SIDEBAR_CONFIG.styles.list,
            }}
        >
            <Box
                sx={{
                    ...SIDEBAR_CONFIG.styles.header,
                    height: topbarHeight,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                {isExpanded ? (
                    <Box
                        component='img'
                        src={logoExpanded}
                        alt='ADAPT'
                        onClick={() => handleNavigation('/dashboard')}
                        sx={SIDEBAR_CONFIG.styles.logo}
                    />
                ) : (
                    <Typography
                        variant='h6'
                        color='primary'
                        onClick={() => handleNavigation('/dashboard')}
                        sx={{ textAlign: 'center' }}
                    >
                        A
                    </Typography>
                )}

                <Box
                    sx={{
                        ...SIDEBAR_CONFIG.styles.toggleButton,
                        left: isExpanded
                            ? SIDEBAR_CONFIG.positions.toggleButton.expanded.left
                            : SIDEBAR_CONFIG.positions.toggleButton.collapsed.left,
                    }}
                >
                    <IconButton
                        onClick={onToggle}
                        aria-label={isExpanded ? 'collapse sidebar' : 'expand sidebar'}
                    >
                        {isExpanded ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </Box>
            </Box>

            <Stack sx={{ flexGrow: 1 }}>
                {mainRoutes.map((item, index) => (
                    <NavItem
                        key={index}
                        item={item}
                        isExpanded={isExpanded}
                        onClick={() => handleNavigation(item.path)}
                    />
                ))}
            </Stack>

            {/* Logout sempre in fondo */}
            {logoutRoute && (
                <Stack sx={{ mb: 1, alignItems: 'center' }}>
                    <NavItem
                        item={logoutRoute}
                        isExpanded={isExpanded}
                        onClick={() => handleNavigation(logoutRoute.path, true)}
                    />
                </Stack>
            )}
        </List>
    );
};

export default Sidebar;
