import { UseAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box, Stack, useTheme, Container } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { Role } from '../../types/User';

type PrivateRouteProps = {
    allowedRoles: string[];
};

const topbarHeight = '64px';
const sidebarWidth = '160px';

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    const { user, hasCookie, isLoading } = UseAuth();
    const theme = useTheme();
    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if (!user || !hasCookie) {
        return <Navigate to='/' />;
    }
    if (user ? !allowedRoles.includes(user.roles as Role) : true) {
        return <Navigate to='/' />;
    }
    return (
        <Box>
            {/* Topbar */}
            <Topbar topbarHeight={topbarHeight} />
            {/* Page content */}
            <Box
                sx={{
                    minHeight: 'calc(100vh - 64px)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    mt: topbarHeight, // Compensate for the topbar height
                }}
            >
                {/* Topbar */}
                <Sidebar sidebarWidth={sidebarWidth} topbarHeight={topbarHeight} />
                <Box sx={{ ml: sidebarWidth, p: 8, flexGrow: 1 }}>
                    {/* This will render the current page */}
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default PrivateRoute;
