import { UseAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

type PrivateRouteProps = {
    allowedRoles: string[];
};

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
    const { user, isLoading } = UseAuth();
    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if (!user) {
        return <Navigate to="/"/>;
    }
    if (!user.roles?.split(",").some((role) => allowedRoles.includes(role))) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default PrivateRoute;
