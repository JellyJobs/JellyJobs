import '../../assets/styles/pages/scores.css';
import React, { useEffect, useState } from 'react';
import { Menu, Input, Card, Divider, Button, Modal, Checkbox, FloatButton } from 'antd';
import {
    BellOutlined,
    PlusSquareOutlined,
    FileTextOutlined,
    StarOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import HeaderLog from '../../components/common/header-log.jsx';

const items = [
    { key: 'Crear Trabajador', label: 'Crear', icon: <PlusSquareOutlined /> },
    { key: 'Notificaciones', label: 'Notificaciones', icon: <BellOutlined /> },
    { key: 'Solicitudes', label: 'Solicitudes', icon: <FileTextOutlined /> },
    { key: 'Puntuación', label: 'Puntuación', icon: <StarOutlined /> },
];

export default function Home() {
    const userEmail = 'admin@example.com';
    const [trabajadores, setTrabajadores] = useState([]);
    const [selectedTrabajadores, setSelectedTrabajadores] = useState([]);
    const [modalOpiniones, setModalOpiniones] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // Manejar selección de trabajadores
    const handleCheckboxChange = (idtrabajador, checked) => {
        setSelectedTrabajadores((prev) => {
            if (checked) {
                return [...prev, idtrabajador];
            }
            return prev.filter((id) => id !== idtrabajador);
        });
    };

    // Obtener trabajadores desde el endpoint
    useEffect(() => {
        fetch('http://127.0.0.1:8000/app/trabajador-card/')
            .then((response) => response.json())
            .then((data) => setTrabajadores(data))
            .catch((error) => console.error('Error al cargar los trabajadores:', error));
    }, []);

    // Llamar al endpoint externo para obtener opiniones y puntajes
    const obtenerOpiniones = () => {
        fetch('https://api.opiniones-externas.com/opiniones/') // Reemplaza con la URL correcta
            .then((response) => response.json())
            .then((data) => {
                // Agregar opiniones y puntajes a los trabajadores seleccionados
                const updatedTrabajadores = trabajadores.map((trabajador) => {
                    if (selectedTrabajadores.includes(trabajador.idtrabajador)) {
                        const opinionData = data.find((d) => d.idtrabajador === trabajador.idtrabajador);
                        return {
                            ...trabajador,
                            opinion: opinionData ? opinionData.opinion : 'Sin opinión',
                            puntaje: opinionData ? opinionData.puntaje : 0,
                        };
                    }
                    return trabajador;
                });
                setTrabajadores(updatedTrabajadores);
                setModalVisible(true); // Mostrar el modal con las opiniones
                setModalOpiniones(selectedTrabajadores.map((id) => {
                    const trabajador = updatedTrabajadores.find((t) => t.idtrabajador === id);
                    return {
                        nombre: trabajador.nombre,
                        opinion: trabajador.opinion,
                        puntaje: trabajador.puntaje,
                    };
                }));
            })
            .catch((error) => console.error('Error al obtener opiniones:', error));
    };

    const closeModal = () => setModalVisible(false);

    const filteredTrabajadores = trabajadores.filter(
        (trabajador) =>
            trabajador.estadotrabajo === 'Disponible' &&
            trabajador.nombre.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="home-page">
            <HeaderLog userEmail={userEmail} />
            <div className="menu-container">
                <Menu className="menu-functions" mode="inline" items={items} />
            </div>
            <div className="search-bar">
                <Input
                    placeholder="Buscar trabajador"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <div className="trabajadores-container">
                {filteredTrabajadores.map((trabajador) => (
                    <Card
                        className="trabajador-card"
                        key={trabajador.idtrabajador}
                        title={
                            <Checkbox
                                onChange={(e) =>
                                    handleCheckboxChange(trabajador.idtrabajador, e.target.checked)
                                }
                            />
                        }
                    >
                        <div className="trabajador-img-container">
                            <img
                                src={`http://localhost:8000${trabajador.imagenlink}`}
                                alt={`${trabajador.nombre} ${trabajador.apellido}`}
                                className="trabajador-img"
                            />
                        </div>
                        <h3>{`${trabajador.nombre} ${trabajador.apellido}`}</h3>
                        <Divider />
                        <p><strong>Edad:</strong> {trabajador.edad}</p>
                        <p><strong>DNI:</strong> {trabajador.dni}</p>
                        <p><strong>Profesión:</strong> {trabajador.profesion}</p>
                    </Card>
                ))}
            </div>

            {selectedTrabajadores.length > 0 && (
                <FloatButton
                    type="primary"
                    onClick={obtenerOpiniones}
                    style={{
                        position: 'absolute', // Cambiar de 'fixed' a 'absolute'
                        bottom: '50%', // Centramos verticalmente dentro del contenedor
                        left: '50%', // Centramos horizontalmente
                        transform: 'translate(-50%, 50%)', // Ajuste para el centrado real
                        zIndex: 10, // Aseguramos que esté encima de los elementos
                    }}
                >
                    Obtener Opiniones
                </FloatButton>
            )}

            <Modal
                title="Opiniones y Puntajes"
                visible={modalVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Cerrar
                    </Button>,
                ]}
            >
                {modalOpiniones.map((item, index) => (
                    <p key={index}>
                        {item.nombre}: {item.opinion} (Puntaje: {item.puntaje})
                    </p>
                ))}
            </Modal>
        </div>
    );
}