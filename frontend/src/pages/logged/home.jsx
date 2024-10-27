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
    //manejo de os items del menu (q pasaria cunado haces click)
    const onClick = (e) => {
        console.log('Click: ', e);
    };
    
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
        </div>
    );
}
