import { Route } from 'react-router-dom';
// NAV ROUTES
import Profile from '../../pages/profile/Profile';
import Dashboard from '../../pages/dashboard/Dashboard';
import Analysis from '../../pages/analysis/Analysis';
import Simulations from '../../pages/simulations/Simulations';
import Uploads from '../../pages/uploads/Uploads';
// ICONS
import {
    Dashboard as Dashboardicon,
    BarChart,
    PlayCircle,
    UploadFile,
    Logout,
} from '@mui/icons-material';
// CONFIGS
export const AppRoutes = [
    {
        path: '/dashboard',
        element: <Dashboard />,
        icon: <Dashboardicon />,
        text: 'Dashboard',
        isNav: true,
    },
    {
        path: '/analysis',
        element: <Analysis />,
        icon: <BarChart />,
        text: 'Analysis',
        isNav: true,
    },
    {
        path: '/simulations',
        element: <Simulations />,
        icon: <PlayCircle />,
        text: 'Simulations',
        isNav: true,
    },
    {
        path: '/uploads',
        element: <Uploads />,
        icon: <UploadFile />,
        text: 'Uploads',
        isNav: true,
    },
    {
        path: '/profile',
        element: <Profile />,
        text: 'Profile',
        isNav: false,
    },
    {
        path: '/',
        element: null,
        icon: <Logout color='error' />,
        text: 'Logout',
        isLogout: true,
    },
];
// ROUTER
const ProtectedAppRoutes = AppRoutes.filter((route) => route.element).map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
));
export default ProtectedAppRoutes
