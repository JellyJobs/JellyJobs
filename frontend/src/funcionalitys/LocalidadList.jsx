import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";

const { Option } = Select;

export const LocalidadLista = ({ onChange }) => {
    const [localidades, setLocalidad] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLocalidad = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/app/localidad/'); // URL del backend Django
            if (!response.ok) {
                throw new Error("Error al obtener las localidades");
            }
            const data = await response.json();
            setLocalidad(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchLocalidad();
    }, []);
    
    if (loading) {
        return <Spin />;
    }

    return (
        <Select placeholder="Selecciona una localidad" onChange={onChange}>
            {localidades.map((localidad) => (
                <Option key={localidad.idlocalidad} value={localidad.idlocalidad}>
                    {localidad.nombre}
                </Option>
            ))}
        </Select>

    );
}