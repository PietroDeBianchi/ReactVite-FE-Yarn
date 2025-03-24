import { Routes, Route } from 'react-router-dom';
// CONFIG
import { AppRoutes } from '../routesConfig';
// GENERAL ROUTES
import Dashboard from '../../pages/dashboard/Dashboard';
import Profile from '../../pages/profile/Profile';

export const ProtectedGeneralRoutes = [
    <Route path='/dashboard' element={<Dashboard />} />,
    <Route path='/profile' element={<Profile />} />,
];

export const ProtectedNavRoutes = AppRoutes.filter((route) => route.element).map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
));
