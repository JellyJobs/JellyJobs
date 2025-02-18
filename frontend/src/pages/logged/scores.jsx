import '../../assets/styles/pages/scores.css';
import React, { useEffect, useState } from 'react';
import { Menu, Input, Card, Divider, Button, Modal, Checkbox, Rate } from 'antd';
import { 
    BellOutlined, 
    PlusSquareOutlined, 
    FileTextOutlined, 
    StarOutlined, 
    SearchOutlined, 
    LeftOutlined, 
    RightOutlined, 
    SkinOutlined 
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import HeaderLog from '../../components/common/header-log.jsx';
import NotificationPopup from "../../components/common/notifyPopUp.jsx"; 
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export default function Scores() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [trabajadores, setTrabajadores] = useState([]);
    const [opiniones, setOpiniones] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [selectedTrabajadores, setSelectedTrabajadores] = useState([]); // Mantén solo un trabajador seleccionado
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserEmail(decoded.email);
        }
        fetch('http://127.0.0.1:9001/app/trabajador-card/')
            .then(response => response.ok ? response.json() : Promise.reject('Error al obtener los trabajadores'))
            .then(data => setTrabajadores(data.filter(trabajador => trabajador.estadotrabajo === 'Disponible')))
            .catch(error => console.error('Error al cargar los trabajadores:', error));
    }, []);

    useEffect(() => {
        // Cambié el nombre de trabajador.postId a currentTrabajador.postId
        const currentTrabajador = trabajadores.find(t => t.idtrabajador === selectedTrabajadores[0]);
        if (currentTrabajador && currentTrabajador.postId) {
            fetch(`http://localhost:8000/posts/${currentTrabajador.postId}/reviews/`)
                .then(response => response.ok ? response.json() : Promise.reject('Error al obtener las opiniones'))
                .then(data => {
                    const opinionesMap = {};
                    data.forEach(opinion => {
                        opinionesMap[opinion.idtrabajador] = opinion.opiniones;
                    });
                    setOpiniones(opinionesMap);
                })
                .catch(error => console.error('Error al cargar las opiniones:', error));
        }
    }, [selectedTrabajadores, trabajadores]);

    const handleSearch = value => setSearchValue(value);

    const filteredTrabajadores = trabajadores.filter((trabajador) => {
        const searchWords = searchValue.toLowerCase().trim();
        const nombreCompleto = `${trabajador.nombre.toLowerCase()} ${trabajador.apellido.toLowerCase()}`;
        return searchWords === "" || nombreCompleto.includes(searchWords);
    });

    const handleCheckboxChange = id => {
        setSelectedTrabajadores([id]); // Solo permitir un trabajador seleccionado
    };

    const currentTrabajador = trabajadores.find(t => t.idtrabajador === selectedTrabajadores[0]);

    const openModal = () => {
        if (selectedTrabajadores.length > 0) {
            setCurrentIndex(0);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const menuItems = [
        { key: "/create", label: "Crear", icon: <PlusSquareOutlined /> },
        { 
            key: "notificaciones", 
            label: "Notificaciones", 
            icon: <BellOutlined />
        },
        { key: "/requests", label: "Solicitudes", icon: <FileTextOutlined /> },
        { key: "/scores", label: "Puntuación", icon: <StarOutlined /> },
        { key: "/uniform", label: "Uniformes", icon: <SkinOutlined /> },
    ];

    const handleMenuClick = ({ key }) => {
        if (key === "notificaciones") {
            setIsNotificationOpen(true); // Abre el popup de notificaciones
        } else {
            navigate(key);
        }
    };

    // Función para manejar la publicación
    const handlePublish = () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5OTQ5MDE1LCJpYXQiOjE3Mzk5MTMwMTUsImp0aSI6IjdmZjM1YmQ0MTJmMTRhMWJhM2IxMGM3YzJlOTNlMjljIiwidXNlcl9pZCI6Mn0.nYrnV_tYvGps2EWrloNXTHoaQB4MrAWvy_orLAb_HsI';  // Token JWT
        
        if (selectedTrabajadores.length > 0) {
            selectedTrabajadores.forEach(idtrabajador => {
                const trabajador = trabajadores.find(t => t.idtrabajador === idtrabajador);
                if (trabajador) {
                    const title = `${trabajador.nombre} ${trabajador.apellido}`;
                    const description = "Trabajador de JellyJobs"; 
                    const categoria= []
                    fetch('http://127.0.0.1:8000/posts/', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`, 
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title: title,
                            content: description,
                            categories:categoria
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Publicación creada con éxito:', data);
                        const postID = data.id;
                        fetch(`http://127.0.0.1:9001/app/trabajadores/${trabajador.idtrabajador}/update-postid/`, {
                            method: 'PATCH',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ postID: postID })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log('postID asociado al trabajador:', data);
                        })
                        .catch(error => {
                            console.error('Error al asociar el postID al trabajador:', error);
                        });
                    })
                    .catch(error => {
                        console.error('Error al crear la publicación:', error);
                    });
                }
            });
        }
    };

    return (
        <div className="home-page">
            <HeaderLog userEmail={userEmail} />
            
            {/* MENU LATERAL */}
            <div className="menu-container">
                <Menu
                    className="menu-functions"
                    mode="inline"
                    onClick={handleMenuClick}
                    items={menuItems}
                />
            </div>

            {/* BARRA DE BÚSQUEDA */}
            <div className="search-bar">
                <Input
                    placeholder="Buscar trabajador"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            {/* TARJETAS DE TRABAJADORES */}
            <div className="trabajadores-container">
                {filteredTrabajadores.map(trabajador => (
                    <Card className="trabajador-card disponible" key={trabajador.idtrabajador}>
                        <Checkbox
                            checked={selectedTrabajadores.includes(trabajador.idtrabajador)}
                            onChange={() => handleCheckboxChange(trabajador.idtrabajador)}
                        />
                        <div className="trabajador-img-container">
                            <img
                                src={`http://localhost:9001${trabajador.imagenlink}`}
                                alt={`${trabajador.nombre} ${trabajador.apellido}`}
                                className="trabajador-img"
                            />
                        </div>
                        <h3 className="trabajador-nombre">{`${trabajador.nombre} ${trabajador.apellido}`}</h3>
                        <Divider />
                        <p><strong>Edad:</strong> {trabajador.edad}</p>
                        <p><strong>DNI:</strong> {trabajador.dni}</p>
                        <p><strong>Profesión:</strong> {trabajador.profesion}</p>
                    </Card>
                ))}
            </div>

            {/* Botones adicionales */}
            <div className="botones-inferiores" style={{ position: 'fixed', bottom: '10px', right: '35px' }}>
                <Button
                    type="primary"
                    onClick={openModal}
                    disabled={selectedTrabajadores.length === 0}
                    style={{ marginRight: '10px' }}
                >
                    Ver Opiniones
                </Button>
                <Button
                    type="primary"
                    onClick={handlePublish}
                    disabled={selectedTrabajadores.length === 0}
                    style={{ marginRight: '10px' }}
                >
                    Publicar Trabajador
                </Button>
            </div>

            {/* MODAL CON OPINIONES */}
            <Modal
                title="Opiniones de Trabajadores"
                open={modalVisible}
                onCancel={closeModal}
                footer={null}
                centered
            >
                {currentTrabajador && (
                    <div className="opinion-container">
                        <h3>{currentTrabajador.nombre} {currentTrabajador.apellido}</h3>
                        <Divider />
                        <p><strong>Edad:</strong> {currentTrabajador.edad}</p>
                        <p><strong>Profesión:</strong> {currentTrabajador.profesion}</p>
                        <Divider />
                        <p><strong>Puntuación: </strong><Rate value={opiniones[currentTrabajador.idtrabajador]?.rating || 0} disabled /></p>
                        <Divider />
                        <p><strong>Opiniones:</strong></p>
                        <p>{opiniones[currentTrabajador.idtrabajador]?.join(', ') || 'No hay opiniones disponibles'}</p>

                        {/* Botones de navegación */}
                        <div className="carousel-buttons">
                            <Button
                                icon={<LeftOutlined />}
                                disabled={currentIndex === 0}
                                onClick={() => setCurrentIndex(currentIndex - 1)}
                            />
                            <Button
                                icon={<RightOutlined />}
                                disabled={currentIndex === selectedTrabajadores.length - 1}
                                onClick={() => setCurrentIndex(currentIndex + 1)}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
