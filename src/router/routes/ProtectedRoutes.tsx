import { Route } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";
import Profile from "../../pages/profile/Profile";

const ProtectedRoutes = [
    <Route path="/dashboard" element={<Dashboard />} />,
    <Route path="/profile" element={<Profile />} />,
];

export default ProtectedRoutes;
