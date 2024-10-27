import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from "react-router-dom";
import { LockOutlined, LeftCircleFilled } from '@ant-design/icons';
import '../../assets/styles/pages/forgotPassword.css';
import videoFondo from '../../assets/images/medumedusin.mp4';

const ForgotPassword = () => {
  const onFinish = (values) => {
    console.log('Email enviado: ', values.email);
    // Lógica para enviar el email para recuperar la contraseña
  };

  return (
    <div className='contein-forgot-password-page'>
      <video autoPlay loop muted className='full-screen-background'>
        <source src={videoFondo} type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>
      <Link to="/login" className="back-arrow">
        <LeftCircleFilled />
      </Link>
      <div className='form-part box'>
        <div className='icon-title-container'>
          <LockOutlined style={{ fontSize: '48px', color: 'white' }} />
          <h1 className='title-form'>Olvidaste tu contraseña?</h1>
        </div>
        <p className='subtitle-form'>Puedes recuperar tu contraseña aquí</p>
        
        <Form
          className='forgotPasswordForm'
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className='email-style'
            name="email"
            rules={[
              {
                type: 'email', 
                message: 'Por favor, ingresa un email válido.',
              },
              {
                required: true,
                message: 'Por favor, ingresa tu email.',
              },
            ]}
          >
            <Input placeholder='Ingresa tu email'/>
          </Form.Item>

          <Form.Item className='form-button'>
            <Button className='recover-button' type="primary" htmlType="submit">
              Recuperar mi contraseña
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
