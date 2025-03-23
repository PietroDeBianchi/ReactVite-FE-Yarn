import { useNavigate } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import { Dashboard, AccountCircle, Logout, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { UseAuth } from '../../context/AuthContext';
import logoExpanded from '../../assets/logos/adapt_logo.png';

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

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';

    const menuItems = [
        { icon: <Dashboard />, text: 'Dashboard', path: '/dashboard' },
        { icon: <AccountCircle />, text: 'Profile', path: '/profile' },
        {
            icon: <Logout />,
            text: 'Logout',
            onClick: () => {
                logout();
                navigate('/');
            },
        },
    ];

    return (
        <List
            sx={{
                width: sidebarWidth,
                position: 'fixed',
                top: 0,
                left: 0,
                py: 0,
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
                        component="img"
                        src={logoExpanded}
                        alt="ADAPT"
                        onClick={() => handleNavigation('/dashboard')}
                        sx={{ 
                            height: `80%`,
                            cursor: 'pointer'
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
                        top: 52.5,
                        left: isExpanded ? 140 : 44,
                        transition: transition,
                    }}
                >
                    <IconButton onClick={onToggle}>
                        {isExpanded ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </Box>
            </Box>
            {menuItems.map((item, index) => (
                <Tooltip key={index} title={!isExpanded ? item.text : ''} placement='right'>
                    <ListItem
                        onClick={item.onClick || (() => handleNavigation(item.path!))}
                        sx={{
                            justifyContent: isExpanded ? 'flex-start' : 'center',
                            px: isExpanded ? 2 : 1,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: theme.palette.text.primary,
                                minWidth: isExpanded ? 40 : 'auto',
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        {isExpanded && (
                            <ListItemText
                                primary={item.text}
                                sx={{ color: theme.palette.text.primary }}
                            />
                        )}
                    </ListItem>
                </Tooltip>
            ))}
        </List>
    );
};

export default Sidebar;
