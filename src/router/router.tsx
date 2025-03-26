import { BrowserRouter, Routes, Route } from 'react-router-dom';
// LAYOUTS
import PrivateRoute from '../layouts/private/PrivateRoute';
import PublicRoute from '../layouts/public/PublicRoute';
// ROUTE GROUPS
import PublicAppRoutes from './routes/PublicRoutes';
import ProtectedAppRoutes from './routes/ProtectedRoutes';
// ROLES
import { Role } from '../types/User';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes*/}
                <Route element={<PublicRoute />}>{...PublicAppRoutes}</Route>
                {/* Protected Routes*/}
                <Route
                    element={
                        <PrivateRoute allowedRoles={[Role.User, Role.Admin, Role.SuperAdmin]} />
                    }
                >
                    {...ProtectedAppRoutes}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
