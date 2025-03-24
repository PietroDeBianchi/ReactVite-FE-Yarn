import { BrowserRouter, Routes, Route } from 'react-router-dom';
// LAYOUTS
import PrivateRoute from '../layouts/private/PrivateRoute';
import PublicRoute from '../layouts/public/PublicRoute';
// ROUTE GROUPS
import PublicRoutes from './routes/PublicRoutes';
import { ProtectedGeneralRoutes, ProtectedNavRoutes } from './routes/ProtectedRoutes';
// ROLES
import { Role } from '../types/User';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes*/}
                <Route element={<PublicRoute />}>{...PublicRoutes}</Route>
                {/* Protected Routes*/}
                <Route
                    element={
                        <PrivateRoute allowedRoles={[Role.User, Role.Admin, Role.SuperAdmin]} />
                    }
                >
                    {...ProtectedGeneralRoutes}
                    {...ProtectedNavRoutes}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
