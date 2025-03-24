// NAV ROUTES
import Analysis from '../pages/analysis/Analysis';
import Simulations from '../pages/simulations/Simulations';
import Uploads from '../pages/uploads/Uploads';
import { BarChart, PlayCircle, UploadFile, Logout } from '@mui/icons-material';

// routesConfig.ts
export const AppRoutes = [
    {
        path: '/analysis',
        element: <Analysis />,
        icon: <BarChart />,
        text: 'Analysis',
    },
    {
        path: '/simulations',
        element: <Simulations />,
        icon: <PlayCircle />,
        text: 'Simulations',
    },
    {
        path: '/uploads',
        element: <Uploads />,
        icon: <UploadFile />,
        text: 'Uploads',
    },
    {
        path: '/',
        element: null,
        icon: <Logout color='error' />,
        text: 'Logout',
        isLogout: true,
    },
];
