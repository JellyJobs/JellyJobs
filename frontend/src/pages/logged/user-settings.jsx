import React from 'react';
import { Button, Input, Typography, Tabs } from 'antd';
import { UserOutlined, MailFilled, LockFilled, PoweroffOutlined, LeftCircleFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import '../../assets/styles/pages/user-settings.css';
import videoFondo from '../../assets/images/medumedusin.mp4';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function ProfilePage() {
    const userEmail = "admin@example.com";

    return (
        <div className='user-settings'>
            <video autoPlay loop muted className='full-screen-background'>
                <source src={videoFondo} type="video/mp4" />
                Tu navegador no soporta el formato de video.
            </video>
            <Link Link to="/home" className="back-arrow">
                <LeftCircleFilled />
            </Link>
            <div className='profile-settings-container'>
                <Title level={2} className='settings-title'>Configuración de usuario</Title>
                <div className='settings-layout'>
                    <Tabs defaultActiveKey="1" tabPosition="left">
                        <TabPane
                            tab={
                                <span>
                                    <UserOutlined /> Cuenta
                                </span>
                            }
                            key="1"
                        >
                            <div className='content-box'>
                                <Title level={3} className='settings-subtitle'>Mi Cuenta</Title>
                                <Text className='user-profile-email'>{userEmail}</Text>
                            </div>
                        </TabPane>

                        <TabPane
                            tab={
                                <span>
                                    <MailFilled /> Cambiar mail
                                </span>
                            }
                            key="2"
                        >
                            <div className='content-box'>
                                <Title level={3} className='settings-subtitle'>Cambiar mail de inicio de Sesión</Title>
                                <label>Ingrese su nuevo mail</label>
                                <Input className='profile-input' />
                                <Button className='profile-btn'>Verificar mail</Button>
                            </div>
                        </TabPane>

                        <TabPane
                            tab={
                                <span>
                                    <LockFilled /> Cambiar contraseña
                                </span>
                            }
                            key="3"
                            >
                            <div className='content-box'>
                                <Title level={3} className='settings-subtitle'>Cambiar contraseña</Title>
                                <label>Ingrese su contraseña actual</label>
                                <Input.Password className='profile-input' />
                                <label>Ingrese la nueva contraseña</label>
                                <Input.Password className='profile-input' />
                                <label>Repita la nueva contraseña</label>
                                <Input.Password className='profile-input' />
                                <Button className='profile-btn'>Cambiar contraseña</Button>
                            </div>
                        </TabPane>

                        <TabPane
                             tab={
                                <Button 
                                    className='logout-btn'
                                    onClick={() => window.location.href = '/'}
                                >
                                    <PoweroffOutlined /> Cerrar Sesión
                                </Button>
                            }
                            key="4"
                        >
                        </TabPane>
                        
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
