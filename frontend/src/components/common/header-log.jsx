import React from 'react';
import { ConfigProvider, Space, Typography, Button, Dropdown, Avatar, Menu } from 'antd';
import '../../assets/styles/components/header-log.css';
import logo from '../../assets/images/logo.png';
import { BellOutlined, ExclamationOutlined, UserOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons' 
import { Link } from 'react-router-dom';

const itemNotification=[
    {
        key:'cerrar',
        label:'salir',
        icon: <ExclamationOutlined />,
    },
];
const HeaderLog = ({ userEmail }) => {
    // Definición del menú desplegable
    const menuItems = (
        <Menu>
            <Menu.Item key="profile" icon={<SettingOutlined />}>
                <Link to="/perfil-user">Configuración de usuario</Link>  {/* Cambia aquí a /perfil-user */}
            </Menu.Item>
            <Menu.Item key="logout" icon={<PoweroffOutlined />}>
                <Link to="/">Cerrar sesión</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <header className='header'>
            <a href="/home" className='links logo-JellyJobs'>
                <img src={logo} alt="logo" />
            </a>
            <Space className='user-log'>
                <Typography.Text className='user-email'>
                    {userEmail}
                </Typography.Text>
                <Dropdown overlay={menuItems} trigger={['click']} placement="bottomRight">
                    <Avatar icon={<UserOutlined />} className="user-avatar" />
                </Dropdown>
            </Space>
        </header>
    );
};

export default HeaderLog;
