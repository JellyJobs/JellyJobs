import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("access_token");
      if (!token) {
        setIsAuthenticated(false);
        alert('Usuario no Autenticado')
        return;
      }

      try {
        const response = await fetch("http://localhost:9001/app/validate-token/", {
          method: "GET",
          credentials: "include", // Importante para enviar cookies al backend
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setIsAuthenticated(data.valido);
      } catch (error) {
        console.error("Error al validar token", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Verificando autenticación...</p>; // O algún loader
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;





