import { Route } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";

export const userRoutes = [
    <Route key="dashboard" path="/dashboard" element={<Dashboard />} />
];
