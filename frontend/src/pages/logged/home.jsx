import '../../assets/styles/pages/home.css';
import React, { useEffect, useState } from 'react';
import { Menu, Avatar, Input, Select,Card } from 'antd';
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
    // Función para manejar el cambio de estado de un trabajador
    const handleEstadoChange = (idtrabajador, newEstado) => {
        // Actualizar el estado de los trabajadores en el frontend
        setTrabajadores(trabajadores.map((trabajador) =>
            trabajador.idtrabajador === idtrabajador
                ? { ...trabajador, estadotrabajo: newEstado }
                : trabajador
        ));
    
        // Aquí se hace el fetch para actualizar el estado en la base de datos
        fetch(`http://127.0.0.1:8000/app/update-trabajador/${idtrabajador}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estadotrabajo: newEstado }), // Pasamos el nuevo estado
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Estado actualizado:', data);
        })
        .catch((error) => {
            console.error('Error al actualizar el estado:', error);
        });
    };


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
                {/* Usamos Cards de Ant Design para renderizar los trabajadores */}
                {filteredTrabajadores.map((trabajador) => (
                    <Card className={`trabajador-card ${trabajador.estadotrabajo.toLowerCase()}`}  key={trabajador.id} title={`${trabajador.nombre} ${trabajador.apellido}`}>
                        <p><strong>Profesión:</strong> {trabajador.profesion}</p>
                        <p><strong>Estado:</strong>
                            <Select
                                value={trabajador.estadotrabajo}
                                onChange={(value) => handleEstadoChange(trabajador.idtrabajador, value)}
                            >
                                <Select.Option value="Disponible">Disponible</Select.Option>
                                <Select.Option value="Ocupado">Ocupado</Select.Option>
                                <Select.Option value="Inactivo">Inactivo</Select.Option>
                            </Select>
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    );
}