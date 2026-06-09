import { Navigate, Outlet } from "react-router";

const STORAGE_KEY = "orbitasafe_usuario";

export const PrivateRoutes = () => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return <Navigate to="/login" replace />;
    return <Outlet />;
};
