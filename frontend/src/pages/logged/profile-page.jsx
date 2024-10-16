import React from 'react';
import { Button, Input, Typography, Tabs } from 'antd';
import '../../assets/styles/pages/profile-page.css';
import HeaderLog from '../../components/common/header-log';

const { Text, Title } = Typography;
const { TabPane } = Tabs;

export default function ProfilePage() {
    const userEmail = "admin@example.com";

    return (
        <div className='profile-page'>
            <HeaderLog userEmail={userEmail} />
            <div className='profile-container'>
                <Title level={3} className='section-title'>Mi Cuenta</Title>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Mi Cuenta" key="1">
                        <Text className='user-profile-email'>{userEmail}</Text>
                    </TabPane>
                    <TabPane tab="Modificar Usuario" key="2">
                        <Input placeholder="Cambiar contraseña" className='profile-options' />
                        <Input placeholder="Cambiar email" className='profile-options' />
                        <Button className='profile-btn'>Guardar Cambios</Button>
                    </TabPane>
                </Tabs>
                <a href="/" className='logout-link'>
                    <Button className='logout-btn'>Cerrar Sesión</Button>
                </a>
            </div>
        </div>
    );
}