import React, { useEffect, useState } from "react";
import { Menu, Table, Spin, Input, Button, Popconfirm } from "antd";
import {
    BellOutlined,
    PlusSquareOutlined,
    FileTextOutlined,
    StarOutlined,
    SkinOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import HeaderLog from "../../components/common/header-log.jsx";
import '../../assets/styles/pages/requests.css';

const Solicitudes = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate(); // Hook para navegación

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

    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/app/solicitudes/${id}/`, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                setSolicitudes(solicitudes.filter(solicitud => solicitud.idsolicitud !== id));
            } else {
                console.error("Error al eliminar la solicitud");
            }
        })
        .catch(error => console.error("Error en la solicitud de eliminación:", error));
    };

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
                            <li key={trabajador.idtrabajador}>{trabajador.nombre} {trabajador.apellido}</li>
                        ))}
                    </ul>
                ) : "Sin trabajadores"
            )
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
                <Popconfirm
                    title="¿Estás seguro de eliminar esta solicitud?"
                    onConfirm={() => handleDelete(record.idsolicitud)}
                    okText="Sí"
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteOutlined />} />
                </Popconfirm>
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
                    <Menu
                        className="menu-functions"
                        mode="inline"
                        onClick={({ key }) => navigate(key)} // Maneja la navegación
                        items={[
                            { key: "/create", label: "Crear", icon: <PlusSquareOutlined /> },
                            { key: "/notificaciones", label: "Notificaciones", icon: <BellOutlined /> },
                            { key: "/requests", label: "Solicitudes", icon: <FileTextOutlined /> },
                            { key: "/scores", label: "Puntuación", icon: <StarOutlined /> },
                            { key: "/uniformes", label: "Uniformes", icon: <SkinOutlined /> },
                        ]}
                    />
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
