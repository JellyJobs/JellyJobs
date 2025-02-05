import '../../assets/styles/pages/home.css';
import { jwtDecode } from 'jwt-decode';
import { ProfessionSelect } from '../../funcionalitys/profesionLista.jsx';
import React, { useEffect, useState } from 'react';
import { Menu, Select, Card, Divider,Input } from 'antd';
import {
    BellOutlined,
    PlusSquareOutlined,
    FileTextOutlined,
    StarOutlined,
    SkinOutlined,
} from '@ant-design/icons';
import HeaderLog from '../../components/common/header-log.jsx';
import DetalleTrabajador from '../../components/common/detail.jsx';

const items = [
    { key: 'Crear Trabajador', label: 'Crear', icon: <PlusSquareOutlined /> },
    { key: 'Notificaciones', label: 'Notificaciones', icon: <BellOutlined /> },
    { key: 'Solicitudes', label: 'Solicitudes', icon: <FileTextOutlined /> },
    { key: 'Puntuación', label: 'Puntuación', icon: <StarOutlined /> },
    { key: 'Uniformes', label: 'Uniformes', icon: <SkinOutlined /> },	
];

export default function Home() {
    const [trabajadores, setTrabajadores] = useState([]);
    const [estadoFilter, setEstadoFilter] = useState('');
    const [profesionFilter, setProfesionFilter] = useState('');
    const [selectedTrabajador, setSelectedTrabajador] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [searchValue, setSearchValue] = useState('');
    

    const handleTrabajadorClick = (idtrabajador) => {
        fetch(`http://127.0.0.1:8000/app/trabajador/${idtrabajador}/`)
            .then((response) => response.json())
            .then((data) => setSelectedTrabajador(data))
            .catch(console.error);
    };
    
    

    // Actualizar el estado del trabajador
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

    // Cargar trabajadores desde la API
    useEffect(() => {
         // Obtener el JWT del localStorage
         const token = localStorage.getItem('access_token');
        
         if (token) {
             // Decodificar el JWT
             const decoded = jwtDecode(token);

             // Establecer el email del admin desde el payload
             setUserEmail(decoded.email);  // Suponiendo que el campo del email en el JWT es 'email'
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
    
        // Asegúrate de que `trabajador.profesion_id` sea el campo que contiene el ID
        const profesionMatch = !profesionFilter || (trabajador.profesion=== profesionFilter);
    
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
                <Input.Search
                    style={{ width: 300, marginRight: 8 }}
                    placeholder="Buscar por nombre o apellido"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    enterButton
                />
                <Select
                    style={{ width: 120, marginLeft: 8 }}
                    placeholder="Estado"
                    value={estadoFilter}
                    onChange={setEstadoFilter}
                    options={[
                        { value: 'inactivo'||'Inactivo', label: 'Inactivo' },
                        { value: 'disponible'||'Disponible', label: 'Disponible' },
                        { value: 'ocupado'||'Ocupado', label: 'Ocupado' },
                    ]}
                />
                <ProfessionSelect onChange={(value) => setProfesionFilter(value)} />
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
                            onClick={(e) => e.stopPropagation()}  // Evita que el clic se propague al Card
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
        </div>
    );
}
