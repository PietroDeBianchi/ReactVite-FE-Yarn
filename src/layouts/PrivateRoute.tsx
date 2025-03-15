import { UseAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box, Container, Stack, useTheme } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';

type PrivateRouteProps = {
    allowedRoles: string[];
};

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    const { user, hasCookie, isLoading } = UseAuth();
    const theme = useTheme();

    if (!user && !hasCookie) {
        return <Navigate to='/' />;
    }
    if (user ? !user.roles?.split(',').some((role) => allowedRoles.includes(role)) : false && !hasCookie) {
        return <Navigate to='/' />;
    }
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
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
            }}
        >
            {/* Sidebar */}
            <Sidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Topbar */}
                <Topbar />
                {/* Page content */}
                <Stack
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    <Container>
                        <Outlet /> {/* This will render the current page */}
                    </Container>
                </Stack>
            </Box>
        </Box>
    );
};

export default PrivateRoute;
