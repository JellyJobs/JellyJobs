import React, { useEffect, useState } from 'react';
import { Button, Input, Typography, Tabs,notification,message} from 'antd';
import { UserOutlined, MailFilled, LockFilled, PoweroffOutlined, LeftCircleFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import '../../assets/styles/pages/user-settings.css';
import videoFondo from '../../assets/images/medumedusin.mp4';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function ProfilePage() {
    const [userEmail, setUserEmail] = useState('');
    const [nuevoEmail, setNuevoEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            message.error("Todos los campos son obligatorios.");
            return;
        }

        if (newPassword !== confirmPassword) {
            message.error("Las contraseñas no coinciden.");
            return;
        }

        fetch("http://127.0.0.1:9001/app/cambiar-contrasena/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                contrasena_actual: currentPassword,
                nueva_contrasena: newPassword,
                confirmar_contrasena: confirmPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                notification.success({
                    message: "Éxito",
                    description: "Contraseña modificada exitosamente",
                }); 
                message.success(data.message);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                navigate("/home");
            } else {
                notification.success({
                    message: "Error",
                    description: "Vuelva a intentar mas tarde...",
                }); 
                message.error(data.error);
            }
        })
        .catch(error => message.error("Error en el servidor."));
    };

    const navigate = useNavigate();  // Usar useNavigate para redirigir
    useEffect(() => {
    const token = Cookies.get("access_token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserEmail(decoded.email);
        }
    }, []);
        // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Eliminar la cookie
        Cookies.remove("access_token");
    
        // Redirigir al login después de eliminar la cookie
        navigate("/"); // Redirige al login
    };

    const handleEmailChange = () => {
        alert(`Email actual: ${userEmail}\nNuevo email: ${nuevoEmail}`);
        // Llama al endpoint para cambiar el email
        fetch("http://127.0.0.1:9001/app/cambiar-email/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email_actual: userEmail,
                nuevo_email: nuevoEmail
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log(data.message);  // Muestra el mensaje de éxito
                notification.success({
                    message: "Éxito",
                    description: " Email modificado",
                }); 
                // Actualiza la cookie con el nuevo access_token
                Cookies.set('access_token', data.access_token, { expires: 7, path: '/' });  // Guarda la cookie con el nuevo token

                // Actualiza el estado con el nuevo email
                setUserEmail(nuevoEmail);
                navigate("/home");
            } else {
                console.error(data.error);  // Muestra el mensaje de error
                notification.error({
                    message: "Error",
                    description: "Vuelva a intentar mas tarde...",
                }); 
            }
        })
        .catch(error => console.error("Error:", error));
    };


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
                                <Input className='profile-input' value={nuevoEmail} onChange={e => setNuevoEmail(e.target.value)}/>
                                <Button className='profile-btn' onClick={handleEmailChange}>Verificar mail</Button>
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
                                <Input.Password className='profile-input' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                                <label>Ingrese la nueva contraseña</label>
                                <Input.Password className='profile-input' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                                <label>Repita la nueva contraseña</label>
                                <Input.Password className='profile-input' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
                                <Button className='profile-btn' onClick={handleChangePassword}>Cambiar contraseña</Button>
                            </div>
                        </TabPane>

                        <TabPane
                            tab={
                                <Button 
                                    className='logout-btn'
                                    onClick={() => handleLogout()}
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
