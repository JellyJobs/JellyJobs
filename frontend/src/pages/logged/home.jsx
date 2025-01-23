import '../../assets/styles/pages/home.css';
import React, { useEffect, useState } from 'react';
import { Menu, Avatar, Input, Select } from 'antd';
import { 
    SolutionOutlined, 
    MenuOutlined, 
    TeamOutlined, 
    BellOutlined, 
    UserOutlined, 
    FormOutlined, 
    RedoOutlined, 
    PlusSquareOutlined, 
    FileTextOutlined, 
    StarOutlined, 
    SearchOutlined, 
    FilterOutlined
} from '@ant-design/icons';
import HeaderLog from '../../components/common/header-log.jsx';

// Array de elementos del menú
const items = [
    {
        key: 'Crear Trabajador',
        label: 'Crear',
        icon: <PlusSquareOutlined />
    },
    {
        key: 'Notificaciones',
        label: 'Notificaciones',
        icon: <BellOutlined />,
    },
    {
        key: 'Solicitudes',
        label: 'Solicitudes',
        icon: <FileTextOutlined />,
    },
    {
        key: 'Puntuación',
        label: 'Puntuación',
        icon: <StarOutlined />,
    },
];

export default function Home() {
    const userEmail = "admin@example.com";
    const [trabajadores, setTrabajadores] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');
    const [profesionFilter, setProfesionFilter] = useState('');

    // Obtener los datos de los trabajadores desde la API
    useEffect(() => {
        fetch('http://127.0.0.1:8000/app/trabajador-card/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los trabajadores');
                }
                return response.json();
            })
            .then((data) => {
                setTrabajadores(data); // Guardar los trabajadores en el estado
            })
            .catch((error) => {
                console.error('Error al cargar los trabajadores:', error);
            });
    }, []);

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const handleEstadoFilter = (value) => {
        setEstadoFilter(value);
    };

    const handleProfesionFilter = (value) => {
        setProfesionFilter(value);
    };

    // Función de filtrado
    const filteredTrabajadores = trabajadores.filter((trabajador) => {
        const nombreMatch = trabajador.nombre.toLowerCase().includes(searchValue.toLowerCase());
        const estadoMatch = !estadoFilter || trabajador.estadotrabajo === estadoFilter;
        const profesionMatch = !profesionFilter || trabajador.profesion === profesionFilter;
        return nombreMatch && estadoMatch && profesionMatch;
    });

    return (
        <div className="home-page">
            <HeaderLog userEmail={userEmail} />
            <div className="menu-container">
                <Menu
                    className="menu-functions"
                    onClick={(e) => console.log('Click: ', e)}
                    mode="inline"
                    items={items}
                />
            </div>
            <div className="search-bar">
                <Input
                    placeholder="Buscar trabajador"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <Select
                    style={{ width: 120, marginLeft: 8 }}
                    placeholder="Estado"
                    value={estadoFilter}
                    onChange={handleEstadoFilter}
                    options={[
                        { value: 'Inactivo', label: 'Inactivo' },
                        { value: 'Disponible', label: 'Disponible' },
                        { value: 'Ocupado', label: 'Ocupado' },
                    ]}
                />
                <Select
                    style={{ width: 120, marginLeft: 8 }}
                    placeholder="Profesión"
                    value={profesionFilter}
                    onChange={handleProfesionFilter}
                    // Aquí puedes agregar las opciones de profesión dinámicamente
                    options={[
                        { value: 'Desarrollador', label: 'Desarrollador' },
                        { value: 'Diseñador', label: 'Diseñador' },
                        { value: 'Analista', label: 'Analista' },
                        // Agrega más opciones según tus necesidades
                    ]}
                />
            </div>
            <div className="trabajadores-container">
                {/* Renderizar dinámicamente las tarjetas de trabajadores filtrados */}
                {filteredTrabajadores.map((trabajador, index) => (
                    <div className="trabajador-card" key={index}>
                        <h3>
                            {trabajador.nombre} {trabajador.apellido}
                        </h3>
                        <p>
                            <strong>Profesión:</strong> {trabajador.profesion}
                        </p>
                        <p>
                            <strong>Estado:</strong> {trabajador.estadotrabajo}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}