import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";

const PrivateRoute = () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        message.error("Debes iniciar sesión para acceder");
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convertir a segundos

        if (decoded.exp < currentTime) {
        message.error("Tu sesión ha expirado. Inicia sesión nuevamente.");
        localStorage.removeItem("access_token");
        return <Navigate to="/login" replace />;
        }
    } catch (error) {
        message.error("Token inválido. Inicia sesión nuevamente.");
        localStorage.removeItem("access_token");
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;

