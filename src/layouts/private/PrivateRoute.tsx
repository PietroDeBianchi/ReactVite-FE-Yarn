import { UseAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box, useMediaQuery } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { Role } from '../../types/User';
import { useState } from 'react';
import MobileSidebar from '../../components/sidebar/MobileSidebar';

// Types
type PrivateRouteProps = {
    allowedRoles: string[];
};

// Layout configuration
const LAYOUT_CONFIG = {
    topbar: {
        height: '72px',
    },
    sidebar: {
        expanded: '160px',
        collapsed: '64px',
    },
    breakpoints: {
        mobile: '(max-width: 600px)',
    },
} as const;

/**
 * PrivateRoute component handles protected routes with role-based access control
 * and responsive layout management
 */
const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    const { user, hasCookie, isLoading } = UseAuth();
    const isMobile = useMediaQuery(LAYOUT_CONFIG.breakpoints.mobile);
    
    // State management for sidebar
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    
    // Compute current sidebar width based on expanded state
    const currentSidebarWidth = isExpanded 
        ? LAYOUT_CONFIG.sidebar.expanded 
        : LAYOUT_CONFIG.sidebar.collapsed;

    // Loading state
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

    // Authentication and authorization checks
    if (!user || !hasCookie) {
        return <Navigate to='/' />;
    }
    if (!allowedRoles.includes(user.roles as Role)) {
        return <Navigate to='/' />;
    }

    return (
        <Box>
            {/* Mobile sidebar with overlay */}
            {isMobile && (
                <MobileSidebar
                    open={isMobileSidebarOpen}
                    onClose={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Top navigation bar */}
            <Topbar
                sidebarWidth={currentSidebarWidth}
                topbarHeight={LAYOUT_CONFIG.topbar.height}
                isMobile={isMobile}
                onSidebarOpen={() => setIsMobileSidebarOpen(true)}
            />

            {/* Main content area */}
            <Box
                sx={{
                    minHeight: 'calc(100vh - 64px)',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    mt: LAYOUT_CONFIG.topbar.height,
                }}
            >
                {/* Desktop sidebar */}
                {!isMobile && (
                    <Sidebar
                        sidebarWidth={currentSidebarWidth}
                        topbarHeight={LAYOUT_CONFIG.topbar.height}
                        isExpanded={isExpanded}
                        onToggle={() => setIsExpanded(!isExpanded)}
                    />
                )}

                {/* Page content with responsive padding */}
                <Box
                    sx={{
                        ml: isMobile ? 0 : currentSidebarWidth,
                        flexGrow: 1,
                        px: !isMobile ? 6 : 2,
                        py: 4,
                        transition: 'margin-left 0.3s ease-in-out',
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default PrivateRoute;
