import React, { useEffect, useState } from "react";

const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/app/listar-solicitudes/")
            .then(response => response.json())
            .then(data => {
                // Verifica si la API devuelve un array o un objeto con clave 'solicitudes'
                const solicitudesData = Array.isArray(data) ? data : data.solicitudes;
                setSolicitudes(solicitudesData || []);
            })
            .catch(error => {
                console.error("Error al obtener las solicitudes:", error);
            });
    }, []);

    return (
        <div>
            <h2>Solicitudes Recibidas</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID Solicitud</th>
                        <th>Empresa</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Trabajadores</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(solicitudes) && solicitudes.length > 0 ? (
                        solicitudes.map((solicitud) => (
                            <tr key={solicitud.idsolicitud}>
                                <td>{solicitud.idsolicitud}</td>
                                <td>{solicitud.empresa}</td>
                                <td>{solicitud.fecha_inicio}</td>
                                <td>{solicitud.fecha_fin}</td>
                                <td>
                                    {Array.isArray(solicitud.idtrabajadores) && solicitud.idtrabajadores.length > 0 ? (
                                        <ul>
                                            {solicitud.idtrabajadores.map((trabajador) => (
                                                <li key={trabajador.id}>
                                                    {trabajador.id} - {trabajador.nombre}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "Sin trabajadores"
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay solicitudes disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Solicitudes;

