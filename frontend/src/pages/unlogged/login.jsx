import { Form, Input, Button, message } from 'antd';
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
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Guardar el JWT en localStorage
        localStorage.setItem('access_token', data.access_token);

        message.success("Inicio de sesión exitoso");
        navigate('/home');
      } else {
        const data = await response.json();
        message.error(data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      message.error("Error al conectar con el servidor");
    }
  };

  const passwordField = document.querySelector('.ant-input-password');

  if (passwordField) {
    passwordField.addEventListener('input', function() {
      if (passwordField.value === '') {
        passwordField.style.backgroundColor = 'transparent';
      } else {
        passwordField.style.backgroundColor = 'white';
      }
    });
  } else {
    console.error('El campo de contraseña no se encontró en el DOM.');
  }  

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
            rules={[{ type: 'email', message: 'Por favor, ingresa un email válido.' }, { required: true, message: 'Por favor, ingresa tu email.' }]}
          >
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item
            className='form-items'
            name="password"
            rules={[{ required: true, message: 'Por favor, ingresa tu contraseña.' }]}
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
