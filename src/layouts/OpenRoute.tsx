import { Outlet } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
type PrivateRouteProps = {
    darkMode: boolean;
    toggleTheme: () => void;
};

const PrivateRoute = ({ darkMode, toggleTheme }: PrivateRouteProps) => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            <IconButton
                onClick={toggleTheme}
                color='inherit'
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                }}
            >
                {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <Outlet />
        </Box>
    );
};

export default PrivateRoute;
