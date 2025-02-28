import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedLayoutProps {
    requiredRoles?: string[] | null;
}

export const ProtectedLayout = ({ requiredRoles = [] }: ProtectedLayoutProps) => {
    const { user, loading } = useAuth();
    if (loading) return <p>Loading...</p>;
    if (!user?.roles || (!requiredRoles?.includes(user.roles))) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};
