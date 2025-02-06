import React, { useEffect, useState } from "react";
import { Menu, Table, Spin, Input } from "antd";
import {
    BellOutlined,
    PlusSquareOutlined,
    FileTextOutlined,
    StarOutlined,
    SkinOutlined,
} from "@ant-design/icons";
import HeaderLog from "../../components/common/header-log.jsx";
import '../../assets/styles/pages/requests.css';

const items = [
    { key: "Crear Trabajador", label: "Crear", icon: <PlusSquareOutlined /> },
    { key: "Notificaciones", label: "Notificaciones", icon: <BellOutlined /> },
    { key: "Solicitudes", label: "Solicitudes", icon: <FileTextOutlined /> },
    { key: "Puntuación", label: "Puntuación", icon: <StarOutlined /> },
    { key: "Uniformes", label: "Uniformes", icon: <SkinOutlined /> },
];

const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/app/solicitudes/")
            .then(response => response.json())
            .then(data => {
                const solicitudesData = Array.isArray(data) ? data : data.solicitudes;
                setSolicitudes(solicitudesData || []);
            })
            .catch(error => {
                console.error("Error al obtener las solicitudes:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredSolicitudes = solicitudes.filter(solicitud =>
        solicitud.empresa.toLowerCase().includes(searchValue.toLowerCase())
    );

    const columns = [
        { title: "ID Solicitud", dataIndex: "idsolicitud", key: "idsolicitud" },
        { title: "Empresa", dataIndex: "empresa", key: "empresa" },
        { title: "Fecha Inicio", dataIndex: "fecha_inicio", key: "fecha_inicio" },
        { title: "Fecha Fin", dataIndex: "fecha_fin", key: "fecha_fin" },
        {
            title: "Trabajadores",
            dataIndex: "idtrabajadores",
            key: "idtrabajadores",
            render: (idtrabajadores) => (
                idtrabajadores && idtrabajadores.length > 0 ? (
                    <ul>
                        {idtrabajadores.map(trabajador => (
                            <li key={trabajador.id}>{trabajador.nombre}</li>
                        ))}
                    </ul>
                ) : "Sin trabajadores"
            )
        }
    ];

    return (
        <div className="home-page">
            {/* HEADER */}
            <HeaderLog />

            <div className="main-container">
                {/* MENU LATERAL */}
                <div className="menu-container">
                    <Menu className="menu-functions" mode="inline" items={items} />
                </div>

                {/* CONTENIDO PRINCIPAL */}
                <div className="content">
                    <h2>Solicitudes Recibidas</h2>

                    {/* BARRA DE BÚSQUEDA */}
                    <Input.Search
                        style={{ width: 300, marginBottom: 16 }}
                        placeholder="Buscar por empresa"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        enterButton
                    />

                    {/* TABLA DE SOLICITUDES */}
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <Table
                            dataSource={filteredSolicitudes}
                            columns={columns}
                            rowKey="idsolicitud"
                            className="solicitudes-table"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Solicitudes;
