import { UseAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box, useMediaQuery } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { Role } from '../../types/User';
import { useState } from 'react';
import MobileSidebar from '../../components/sidebar/MobileSidebar';

type PrivateRouteProps = {
    allowedRoles: string[];
};
// CONSTANTS
const topbarHeight = '72px';
const expandedSidebarWidth = '160px';
const collapsedSidebarWidth = '64px';

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    const { user, hasCookie, isLoading } = UseAuth();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [isExpanded, setIsExpanded] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);
    const currentSidebarWidth = isExpanded ? expandedSidebarWidth : collapsedSidebarWidth;

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
            {isMobile && (
                <MobileSidebar
                    open={mobileSidebarOpen}
                    onClose={() => setMobileSidebarOpen(false)}
                />
            )}
            {/* Topbar */}
            <Topbar
                sidebarWidth={currentSidebarWidth}
                topbarHeight={topbarHeight}
                isMobile={isMobile}
                onSidebarOpen={() => setMobileSidebarOpen(true)}
            />
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
                {/* Sidebar */}
                {!isMobile && (
                    <Sidebar
                        sidebarWidth={currentSidebarWidth}
                        topbarHeight={topbarHeight}
                        isExpanded={isExpanded}
                        onToggle={() => setIsExpanded(!isExpanded)}
                    />
                )}
                <Box
                    sx={{
                        ml: isMobile ? 0 : currentSidebarWidth,
                        flexGrow: 1,
                        px: !isMobile ? 6 : 2,
                        py: 4,
                        transition: 'margin-left 0.3s ease-in-out',
                    }}
                >
                    {/* This will render the current page */}
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default PrivateRoute;
