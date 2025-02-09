import React from 'react';
import { ConfigProvider, Space, Typography, Button, Dropdown, Avatar, Menu } from 'antd';
import '../../assets/styles/components/header-log.css';
import logo from '../../assets/images/logo.png';
import { BellOutlined, ExclamationOutlined, UserOutlined, PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const HeaderLog = ({ userEmail }) => {
    const navigate = useNavigate();  // Usar useNavigate para redirigir

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Eliminar la cookie
        Cookies.remove("access_token");

        // Redirigir al login después de eliminar la cookie
        navigate("/"); // Redirige al login
    };
    const itemNotification=[
        {
            key:'cerrar',
            label:'salir',
            icon: <ExclamationOutlined />,
        },
    ];
    
    const menuItems = [
        {
            key: 'profile',
            label: <Link to="/perfil-user">Configuración de usuario</Link>,
            icon: <SettingOutlined />
        },
        {
            key: 'logout',
            label: "Cerrar sesión",
            icon: <PoweroffOutlined />,
            onClick: () => handleLogout(),
        }
    ];
    
    return (
        <header className='header'>
            <a href="/home" className='links logo-JellyJobs'>
                <img src={logo} alt="logo" />
            </a>
            <Space className='user-log'>
                <Typography.Text className='user-email'>
                    {userEmail}
                </Typography.Text>
                <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
                    <Avatar icon={<UserOutlined />} className="user-avatar" />
                </Dropdown>
            </Space>
        </header>
    );
};

export default HeaderLog;
