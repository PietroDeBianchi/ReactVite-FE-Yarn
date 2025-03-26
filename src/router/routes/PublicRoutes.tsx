import { Route } from "react-router-dom";
// NAV ROUTES
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import NotFound from "../../pages/notFound/NotFound";

// CONFIGS
export const AppRoutes = [
    {
        path: '/',
        element: <Login />,
        text: 'Login',
    },
    {
        path: '/register',
        element: <Register />,
        text: 'Analysis',
    },
    {
        path: '*',
        element: <NotFound />,
        text: 'Simulations',
    },
];
// ROUTER
const PublicAppRoutes = AppRoutes.filter((route) => route.element).map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
));
export default PublicAppRoutes;
