import '../../assets/styles/pages/home.css';
import React, { useEffect, useState  } from 'react';
import logo from  '../../assets/images/logo.png';
import { Button, Menu, Avatar, Space  } from 'antd';
import { SolutionOutlined, MenuOutlined, TeamOutlined, BellOutlined, UserOutlined, FormOutlined, RedoOutlined, DeleteOutlined, PlusSquareOutlined  } from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';
import HeaderLog from '../../components/common/header-log.jsx'
//array de elementos del menu
// con children se pueden hacer submenus de un item del menu
const items = [
    {
        key: 'Crear Trabajador',
        label: 'Crear',
        icon: <PlusSquareOutlined />
    },
    {
        key: 'Modificar Trabajador',
        label: 'Modificar',
        icon: <FormOutlined />
    },
    {
        key: 'Eliminar Trabajador',
        label: 'Eliminar',
        icon: <DeleteOutlined />
    },
    {
        key: 'Actualizar Trabajador',
        label: 'Actualizar',
        icon: <RedoOutlined />
    },
    {
        key: 'Notificaciones',
        label: 'Notificaciones',
        icon: <BellOutlined />,
    },
];

export default function Home (){
    const userEmail = "admin@example.com";
    //manejo de los items del menu (q pasaria cunado haces click)
    const onClick = (e) => {
        console.log('Click: ', e);
    };
      // Estado para almacenar los datos de los trabajadores
  const [trabajadores, setTrabajadores] = useState([]);

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
    return (
        <div className='home-page'>
            <HeaderLog userEmail={userEmail} />
            <div className="menu-container">
                <Menu
                    className='menu-functions'
                    onClick={onClick}
                    mode="inline"
                    items={items}
                />
            </div>
            <div className="trabajadores-container">
                {/* Renderizar dinámicamente las tarjetas de trabajadores */}
                {trabajadores.map((trabajador, index) => (
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
