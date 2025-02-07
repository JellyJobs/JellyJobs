import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Para leer el token de las cookies
const PrivateRoute = () => {
  // Verifica si el usuario está autenticado (en este caso, si hay un token en las cookies)
    const isAuthenticated = Cookies.get("access_token");

    if (!isAuthenticated) {
        // Si no está autenticado, redirigimos a la página de login
        return <Navigate to="/login" />;
    }
    
      // Si está autenticado, renderiza el contenido protegido
    return <Outlet />;
}
    
export default PrivateRoute;




