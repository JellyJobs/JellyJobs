import '../../assets/styles/pages/home.css';
import { jwtDecode } from 'jwt-decode';
import { ProfessionSelect } from '../../funcionalitys/profesionLista.jsx';
import Cookies from 'js-cookie'; 
import React, { useEffect, useState } from 'react';
import { Menu, Select, Card, Divider, Input, Button} from 'antd';
import {
    BellOutlined,
    PlusSquareOutlined,
    FileTextOutlined,
    StarOutlined,
    SkinOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import HeaderLog from '../../components/common/header-log.jsx';
import DetalleTrabajador from '../../components/common/detail.jsx';
import { useNavigate } from 'react-router-dom';
import NotificationPopup from '../../components/common/notifyPopUp.jsx';


export default function Home() {
    const navigate = useNavigate();
    const [trabajadores, setTrabajadores] = useState([]);
    const [estadoFilter, setEstadoFilter] = useState(null);
    const [profesionFilter, setProfesionFilter] = useState(null);
    const [selectedTrabajador, setSelectedTrabajador] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [professions, setProfessions] = useState([]);
    const [selectedProfessionName, setSelectedProfessionName] = useState('');
    const [setWorkersCount] = useState(0);
    const [ setSolicitudesCount] = useState(0);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);


    const fetchWorkersCount = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/app/trabajadores-pendientes-num/");
            const data = await response.json();
            setWorkersCount(data.count);
        } catch (error) {
            console.error("Error fetching workers count:", error);
        }
    };

    const fetchSolicitudesCount = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/app/solicitudes-pendientes-num/");
            const data = await response.json();
            setSolicitudesCount(data.count);
        } catch (error) {
            console.error("Error fetching solicitudes count:", error);
        }
    };

    useEffect(() => {
        fetchWorkersCount();
        fetchSolicitudesCount();
        const interval = setInterval(() => {
            fetchWorkersCount();
            fetchSolicitudesCount();
        }, 100000);
        return () => clearInterval(interval);
    }, []);


    const limpiarFiltros = () => {
        setEstadoFilter(null); // Restablece el filtro de estado
        setProfesionFilter(null); // Restablece el filtro de profesión
    };


    const items = [
        { key: 'crear', label: 'Crear', icon: <PlusSquareOutlined />, path: '/create' },
        { 
            key: 'notificaciones', 
            label: 'Notificaciones', 
            icon: (
                
                    <BellOutlined />
                
            )
        },
        { 
            key: 'solicitudes', 
            label: 'Solicitudes', 
            icon: (
                
                    <FileTextOutlined />
               
            ), 
            path: '/requests' 
        },
        { key: 'puntuacion', label: 'Puntuación', icon: <StarOutlined />, path: '/scores' },
        { key: 'uniformes', label: 'Uniformes', icon: <SkinOutlined />, path: '/uniform' },
    ];
    
    const handleMenuClick = (e) => {
        if (e.key === 'notificaciones') {
            setIsNotificationOpen(true); // Abre el popup de notificaciones
        } else {
            const selectedItem = items.find(item => item.key === e.key);
            if (selectedItem && selectedItem.path) {
                navigate(selectedItem.path);
            }
        }
    };
    

    useEffect(() => {
        fetch('http://127.0.0.1:8000/app/profesionlista/')
            .then((response) => response.json())
            .then((data) => setProfessions(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        const selectedProfession = professions.find(prof => prof.idprofesion === parseInt(profesionFilter));
        if (selectedProfession) {
            setSelectedProfessionName(selectedProfession.nombre);
        }
    }, [profesionFilter, professions]);

    const handleTrabajadorClick = (idtrabajador) => {
        fetch(`http://127.0.0.1:8000/app/trabajador/${idtrabajador}/`)
            .then((response) => response.json())
            .then((data) => setSelectedTrabajador(data))
            .catch(console.error);
    };

    const handleEstadoChange = (idtrabajador, newEstado) => {
        setTrabajadores(trabajadores.map((trabajador) =>
            trabajador.idtrabajador === idtrabajador
                ? { ...trabajador, estadotrabajo: newEstado }
                : trabajador
        ));
        fetch(`http://127.0.0.1:8000/app/update-trabajador/${idtrabajador}/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estadotrabajo: newEstado }),
        }).catch(console.error);
    };

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserEmail(decoded.email);
        }
        fetch('http://127.0.0.1:8000/app/trabajador-card/')
            .then((response) => response.json())
            .then((data) => setTrabajadores(data))
            .catch(console.error);
    }, []);

    const filteredTrabajadores = trabajadores.filter((trabajador) => {
        const searchWords = searchValue.toLowerCase().trim();
        const nombreCompleto = `${trabajador.nombre.toLowerCase()} ${trabajador.apellido.toLowerCase()}`;
        const nombreMatch = searchWords === "" || nombreCompleto.includes(searchWords);
        const estadoMatch = !estadoFilter || (trabajador.estadotrabajo && trabajador.estadotrabajo.toLowerCase() === String(estadoFilter).toLowerCase());
        const profesionMatch = !selectedProfessionName || trabajador.profesion.toLowerCase() === selectedProfessionName.toLowerCase();
        return nombreMatch && estadoMatch && profesionMatch;
    });

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
                <Input.Search
                    placeholder="Buscar por nombre o apellido"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className='buscador'
                />
                <Select
                    className="trabajador-select"
                    placeholder="Selecciona un estado"
                    style={{ marginBottom: '9px' }}
                    value={estadoFilter}
                    onChange={setEstadoFilter}
                    options={[
                        { value: 'Disponible', label: 'Disponible' },
                        { value: 'Ocupado', label: 'Ocupado' },
                        { value: 'Inactivo', label: 'Inactivo' },
                    ]}
                />

                <ProfessionSelect
                    onChange={(value) => setProfesionFilter(value)}
                    value={profesionFilter} // Asegúrate de pasar el valor
                     placeholder="Selecciona una profesión"
                />

                {/* Botón para limpiar filtros */}
                <Button
                    type="default"
                    icon={<DeleteOutlined />} // Ícono de cerrar
                    onClick={limpiarFiltros} // Función para limpiar filtros
                    style={{ marginLeft: '10px' , padding: '10px'}} // Estilo opcional
                >
                   
                </Button>
            </div>

            <div className="trabajadores-container">
                {filteredTrabajadores.map((trabajador) => (
                    <Card
                        className={`trabajador-card ${trabajador.estadotrabajo.toLowerCase()}`}
                        key={trabajador.idtrabajador}
                        onClick={() => handleTrabajadorClick(trabajador.idtrabajador)}
                    >
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
                        <p><strong>Estado:</strong></p>
                        <Select
                            value={trabajador.estadotrabajo}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(value) => handleEstadoChange(trabajador.idtrabajador, value)}
                            className="trabajador-select"
                        >
                            <Select.Option value="Disponible">Disponible</Select.Option>
                            <Select.Option value="Ocupado">Ocupado</Select.Option>
                            <Select.Option value="Inactivo">Inactivo</Select.Option>
                        </Select>
                    </Card>
                ))}
            </div>

            {selectedTrabajador && (
                <DetalleTrabajador
                    trabajador={selectedTrabajador}
                    visible={!!selectedTrabajador}
                    onClose={() => setSelectedTrabajador(null)}
                />
            )}

            <NotificationPopup
            isOpen={isNotificationOpen} 
            onClose={() => setIsNotificationOpen(false)} 
            />

        </div>
        
    );
}