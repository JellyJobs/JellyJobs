import React from 'react';
import { ConfigProvider, Space, Button, Avatar, Menu } from 'antd';
import '../../assets/styles/components/headerLog.css';
import logo from '../../assets/images/logo.png';
import userProfile from '../../assets/images/userProfile.jpg'
import { BellOutlined, ExclamationOutlined } from '@ant-design/icons' 

const itemNotification=[
    {
        key:'cerrar',
        label:'salir',
        icon: <ExclamationOutlined />,
    },
];
const HeaderLog = ({ userName }) => (
    <header className='header'>
        <a href="/home" className='links logo-JellyJobs'>
            <img src={logo} alt="logo" />
        </a>
        <div>
            {/*dsp poner ruta a la prox pagina notificaciones */}
            <BellOutlined  className='icon-campanita'  href='/'/>
        </div> 
        <ConfigProvider> 
            <Space className='user-log'>
                <span className='user-name'>{userName}</span>
                <img src={userProfile} alt="User Profile" className='profile-picture' />
            </Space>
        </ConfigProvider>
    </header>
);

export default HeaderLog;
