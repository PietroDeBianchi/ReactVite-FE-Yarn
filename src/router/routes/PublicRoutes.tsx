import { Route } from "react-router-dom";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import NotFound from "../../pages/notFound/NotFound";

const PublicRoutes = [
    <Route path="/" element={<Login />} />,
    <Route path="/register" element={<Register />} />,
    <Route path="*" element={<NotFound />} />,
];

export default PublicRoutes;
