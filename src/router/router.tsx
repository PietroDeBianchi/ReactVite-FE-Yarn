import { BrowserRouter, Routes, Route } from 'react-router-dom';
// LAYOUTS
import PrivateRoute from '../layouts/private/PrivateRoute';
import PublicRoute from '../layouts/public/PublicRoute';
// ROUTE GROUPS
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes*/}
                <Route element={<PublicRoute />}>{...PublicRoutes}</Route>
                {/* Protected Routes*/}
                <Route element={<PrivateRoute allowedRoles={['user', 'admin', 'superadmin']}  />}>
                    {...ProtectedRoutes}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
