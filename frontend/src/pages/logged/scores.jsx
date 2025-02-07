import '../../assets/styles/pages/scores.css';
import React, { useEffect, useState } from 'react';
import { Menu, Input, Card, Divider, Button, Modal, Checkbox } from 'antd';
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
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import HeaderLog from '../../components/common/header-log.jsx';

export default function Home() {
    const navigate = useNavigate(); // Hook de navegación
    const userEmail = 'admin@example.com';
    const [trabajadores, setTrabajadores] = useState([]);
    const [opiniones, setOpiniones] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [selectedTrabajadores, setSelectedTrabajadores] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Obtener trabajadores desde el endpoint
    useEffect(() => {
        fetch('http://127.0.0.1:8000/app/trabajador-card/')
            .then(response => response.ok ? response.json() : Promise.reject('Error al obtener los trabajadores'))
            .then(data => setTrabajadores(data.filter(trabajador => trabajador.estadotrabajo === 'Disponible')))
            .catch(error => console.error('Error al cargar los trabajadores:', error));
    }, []);

    // Obtener opiniones desde el endpoint externo
    useEffect(() => {
        fetch('https://api.opiniones-externas.com/opiniones/')
            .then(response => response.ok ? response.json() : Promise.reject('Error al obtener las opiniones'))
            .then(data => {
                const opinionesMap = {};
                data.forEach(opinion => {
                    opinionesMap[opinion.idtrabajador] = opinion.opiniones;
                });
                setOpiniones(opinionesMap);
            })
            .catch(error => console.error('Error al cargar las opiniones:', error));
    }, []);

    const handleSearch = value => setSearchValue(value);

    // Filtrar trabajadores según el campo de búsqueda
    const filteredTrabajadores = trabajadores.filter((trabajador) => {
        const searchWords = searchValue.toLowerCase().trim();
        const nombreCompleto = `${trabajador.nombre.toLowerCase()} ${trabajador.apellido.toLowerCase()}`;
        return searchWords === "" || nombreCompleto.includes(searchWords);
    });

    // Manejar selección de trabajadores
    const handleCheckboxChange = id => {
        setSelectedTrabajadores(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(tid => tid !== id) : [...prevSelected, id]
        );
    };

    // Obtener datos del trabajador actual para el carrusel
    const currentTrabajador = trabajadores.find(t => t.idtrabajador === selectedTrabajadores[currentIndex]);

    // Mostrar modal de opiniones seleccionadas en formato carrusel
    const openModal = () => {
        if (selectedTrabajadores.length > 0) {
            setCurrentIndex(0);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <div className="home-page">
            <HeaderLog userEmail={userEmail} />
            
            {/* MENU LATERAL */}
            <div className="menu-container">
                <Menu
                    className="menu-functions"
                    mode="inline"
                    onClick={({ key }) => navigate(key)} // Redirige al usuario según la opción seleccionada
                    items={[
                        { key: "/create", label: "Crear", icon: <PlusSquareOutlined /> },
                        { key: "/notificaciones", label: "Notificaciones", icon: <BellOutlined /> },
                        { key: "/requests", label: "Solicitudes", icon: <FileTextOutlined /> },
                        { key: "/scores", label: "Puntuación", icon: <StarOutlined /> },
                        { key: "/uniformes", label: "Uniformes", icon: <SkinOutlined /> },
                    ]}
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
                                src={`http://localhost:8000${trabajador.imagenlink}`}
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

            {/* BOTÓN PARA VER OPINIONES */}
            <div className="opiniones-boton-container">
                <Button
                    type="primary"
                    onClick={openModal}
                    disabled={selectedTrabajadores.length === 0}
                    style={{ position: 'fixed', bottom: '10px', right: '35px' }}
                >
                    Ver Opiniones
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
                        <p><strong>Puntuación: </strong></p>
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
