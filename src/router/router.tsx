import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../layouts/PrivateRoute';
import OpenRoute from '../layouts/OpenRoute';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';
interface AppRouterProps {
    darkMode: boolean;
    toggleTheme: () => void;
}

export default function AppRouter({ toggleTheme, darkMode }: AppRouterProps) {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes*/}
                <Route element={<OpenRoute toggleTheme={toggleTheme} darkMode={darkMode} />}>{...PublicRoutes}</Route>
                {/* Protected Routes*/}
                <Route element={<PrivateRoute allowedRoles={['user', 'admin', 'superadmin']} toggleTheme={toggleTheme} darkMode={darkMode} />}>
                    {...ProtectedRoutes}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
