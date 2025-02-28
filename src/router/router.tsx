import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import NotFound from "../pages/notFound/NotFound";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import { userRoutes } from "./routes/userRoute";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<ProtectedLayout requiredRoles={["user", "admin"]} />}> {/* Protected Routes */}
                    {userRoutes} {/* Import Routes */}
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
