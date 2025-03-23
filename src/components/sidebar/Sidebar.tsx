// HOOKS
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';
// MUI
import { useTheme, Box, List, IconButton, Typography } from '@mui/material';
import { Dashboard, AccountCircle, Logout, ChevronLeft, ChevronRight } from '@mui/icons-material';
// COMPONENTS
import NavItem from '../navItem/NavItem';
// ASSETS
import logoExpanded from '../../assets/logo/logo.png';

interface SidebarProps {
    sidebarWidth: string;
    topbarHeight: string;
    isExpanded: boolean;
    onToggle: () => void;
}

const Sidebar = ({ sidebarWidth, topbarHeight, isExpanded, onToggle }: SidebarProps) => {
    const theme = useTheme();
    const { logout } = UseAuth();
    const navigate = useNavigate();
    const transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';

    const handleNavigation = (path: string, isLogout: boolean = false) => {
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
        <List
            sx={{
                width: sidebarWidth,
                position: 'fixed',
                top: 0,
                left: 0,
                py: 1,
                background: theme.palette.background.default,
                transition: transition,
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRight: `1px solid ${theme.palette.divider}`,
                zIndex: 1300,
                cursor: 'pointer',
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
                    position: 'relative',
                }}
            >
                {isExpanded ? (
                    <Box
                        component='img'
                        src={logoExpanded}
                        alt='ADAPT'
                        onClick={() => handleNavigation('/dashboard')}
                        sx={{
                            height: `80%`,
                            cursor: 'pointer',
                        }}
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
                        position: 'fixed',
                        top: 60.5,
                        left: isExpanded ? 140.5 : 44.5,
                        transition: transition,
                    }}
                >
                    <IconButton onClick={onToggle}>
                        {isExpanded ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </Box>
            </Box>
            {menuItems.map((item, index) => (
                <NavItem
                    key={index} // REACT PROPS KEY
                    item={item}
                    isExpanded={isExpanded}
                    onClick={() => handleNavigation(item.path, item.isLogout)}
                />
            ))}
        </List>
    );
};

export default Sidebar;
