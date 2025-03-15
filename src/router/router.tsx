import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../layouts/PrivateRoute';
import OpenRoute from '../layouts/OpenRoute';
import PublicRoutes from './routes/PublicRoutes';
import ProtectedRoutes from './routes/ProtectedRoutes';


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes*/}
                <Route element={<OpenRoute />}>{...PublicRoutes}</Route>
                {/* Protected Routes*/}
                <Route element={<PrivateRoute allowedRoles={['user', 'admin', 'superadmin']}  />}>
                    {...ProtectedRoutes}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
