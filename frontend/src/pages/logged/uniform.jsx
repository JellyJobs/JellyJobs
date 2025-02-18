import '../../assets/styles/pages/home.css';
import React, { useEffect, useState } from 'react';
import { Menu, Select, Card, Divider, Button, message } from 'antd';
import {
    BellOutlined,
    PlusSquareOutlined,
    FileTextOutlined,
    StarOutlined,
    SkinOutlined,
} from '@ant-design/icons';
import HeaderLog from '../../components/common/header-log.jsx';
import { useNavigate } from 'react-router-dom';
import NotificationPopup from '../../components/common/notifyPopUp.jsx';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function Uniform() {
    const navigate = useNavigate();
    const [trabajadores, setTrabajadores] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [manga, setManga] = useState("Corta");  // Estado para manga
    const [talle, setTalle] = useState("M");  // Estado para talle
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserEmail(decoded.email);
        }
        fetch('http://127.0.0.1:9001/app/trabajadores-sin-uniforme/')
            .then((response) => response.json())
            .then((data) => {
                // Filtra solo aquellos trabajadores cuya propiedad uniforme sea false o no esté presente
                const trabajadoresSinUniforme = data
                setTrabajadores(trabajadoresSinUniforme);
            })
            .catch(console.error);
    }, []);

    const handleSolicitarUniforme = async (idtrabajador) => {
        const payload = {
            talle: talle,
            manga: manga,
            idtrabajador:idtrabajador
        };

        // Realizamos la solicitud POST al backend para crear el pedido
        try {
            const response = await fetch(`http://localhost:9001/app/pedidos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseData = await response.json(); // Intenta leer la respuesta como JSON

            if (response.ok) {
                message.success(`PEDIDO CREADO, EL TRABAJADOR ${idtrabajador} HA OBTENIDO UNIFORMES`);
                setTrabajadores(trabajadores.filter(t => t.idtrabajador !== idtrabajador));
            } else {
                console.error("Respuesta del servidor:", responseData);
                message.error(`Error al solicitar el uniforme: ${responseData.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            message.error("No se pudo completar la solicitud.");
        }
    };

    const items = [
        { key: 'crear', label: 'Crear', icon: <PlusSquareOutlined />, path: '/create' },
        { key: 'notificaciones', label: 'Notificaciones', icon: <BellOutlined /> },
        { key: 'solicitudes', label: 'Solicitudes', icon: <FileTextOutlined />, path: '/requests' },
        { key: 'puntuacion', label: 'Puntuación', icon: <StarOutlined />, path: '/scores' },
        { key: 'uniformes', label: 'Uniformes', icon: <SkinOutlined />, path: '/uniform' },
    ];

    const handleMenuClick = (e) => {
        if (e.key === 'notificaciones') {
            setIsNotificationOpen(true);
        } else {
            const selectedItem = items.find(item => item.key === e.key);
            if (selectedItem && selectedItem.path) {
                navigate(selectedItem.path);
            }
        }
    };

    return (
        <div className="home-page">
            <HeaderLog userEmail={userEmail} />
            <div className="menu-container">
                <Menu
                    className="menu-functions"
                    mode="inline"
                    items={items}
                    onClick={handleMenuClick}
                />
            </div>

            <div className="search-bar">

                <Select
                    className="uniforme-select"
                    placeholder="Selecciona manga"
                    value={manga}
                    onChange={setManga}
                    options={[
                        { value: 'largo', label: 'Manga Corta' },
                        { value: 'corto', label: 'Manga Larga' },
                    ]}
                    style={{ marginRight: '10px' }}
                />

                <Select
                    className="uniforme-select"
                    placeholder="Selecciona talle"
                    value={talle}
                    onChange={setTalle}
                    options={[
                        { value: 'S', label: 'S' },
                        { value: 'M', label: 'M' },
                        { value: 'L', label: 'L' },
                        { value: 'XL', label: 'XL' },
                        { value: 'XXL', label: 'XXL' },
                    ]}
                />
            </div>

            <div className="trabajadores-container">
                {trabajadores.length === 0 ? (
                    <p>No hay trabajadores sin uniforme.</p>
                ) : (
                    trabajadores.map((trabajador) => (
                        <Card
                            className="trabajador-card"
                            key={trabajador.idtrabajador}
                        >
                            <div className="trabajador-img-container">
                                <img
                                    src={`http://localhost:9001${trabajador.imagenlink}`}
                                    alt={`${trabajador.nombre} ${trabajador.apellido}`}
                                    className="trabajador-img"
                                />
                            </div>
                            <h3 className="trabajador-nombre">{`${trabajador.nombre} ${trabajador.apellido}`}</h3>
                            <Divider />
                            <p><strong>Talle:</strong> {trabajador.talle}</p>
                            <p><strong>DNI:</strong> {trabajador.dni}</p>
                            <p><strong>Profesión:</strong> {trabajador.profesion}</p>

                            <Button
                                type="primary"
                                onClick={() => handleSolicitarUniforme(trabajador.idtrabajador)}
                                style={{ marginTop: '10px' }}
                            >
                                Solicitar Uniforme
                            </Button>
                        </Card>
                    ))
                )}
            </div>

            <NotificationPopup
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </div>
    );
}
