import { Route } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard";

const ProtectedRoutes = [<Route path="/dashboard" element={<Dashboard />} />];

export default ProtectedRoutes;
