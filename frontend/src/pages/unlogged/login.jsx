import { Form, Input, Button, message } from 'antd';
import {jwtDecode} from 'jwt-decode';
import { LeftCircleFilled } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import '../../assets/styles/pages/login.css';
import React from 'react'; 
import videoFondo from '../../assets/images/medumedusin.mp4';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/app/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Envía email y contrasena
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.access_token;

        // Guardar el JWT en localStorage
        localStorage.setItem('access_token', token);

        // Decodificar el JWT para obtener el email y idadmin
        const decoded = jwtDecode(token);
        const { email, idadmin } = decoded; // Asegúrate de que el backend envía "idadmin"

        console.log('Email:', email);
        console.log('ID Admin:', idadmin);

        message.success("Inicio de sesión exitoso");

        // Redirigir a la página de inicio
        navigate('/home');
      } else {
        message.error(data.error || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      message.error("Error al conectar con el servidor");
    }
  };

  return (
    <div className='contein-login-page'>
      <video autoPlay loop muted className='full-screen-background'>
        <source src={videoFondo} type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>
      <Link to="/" className="back-arrow">
        <LeftCircleFilled />
      </Link>
      <div className='form-part box'>
        <h1 className='title-form'>Iniciar Sesión</h1>
        <Form
          className='loginform'
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 22 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className='form-items'
            name="email"
            rules={[
              { type: 'email', message: 'Por favor, ingresa un email válido.' },
              { required: true, message: 'Por favor, ingresa tu email.' }
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item
            className='form-items'
            name="contrasena" // <-- Asegura que el frontend envía "contrasena"
            rules={[
              { required: true, message: 'Por favor, ingresa tu contraseña.' }
            ]}
          >
            <Input.Password placeholder='Contraseña' />
          </Form.Item>

          <Form.Item className='form-button'>
            <Button className='login-button' type="primary" htmlType="submit">
              Acceder
            </Button>
          </Form.Item>

          <p className="page-link">
            <Link to="/forgot-password" className="page-link-label">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;

