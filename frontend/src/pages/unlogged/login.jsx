import { Form, Input, Button,  } from 'antd';
import '../../assets/styles/pages/login.css';
import React from 'react';

import videoFondo from '../../assets/images/medumedusin.mp4';

const Login = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    //backend
  };

  return (
    <div className='contein-login-page'>
      <video autoPlay loop muted className='full-screen-background'>
        <source src={videoFondo} type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>
      
      <div className='form-part box'>
      <h1 className='title-form'>Login</h1>
        <Form
          className='loginform'
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          
          <Form.Item
            className='form-items'
            name="Nombre"
            rules={[
              {
                type: 'name',
                message: 'Por favor ingresa un nombre válido',
              },
              {
                required: true,
                message: 'Por favor ingresa tu nombre',
              },
            ]}
          >
            <Input placeholder='Nombre'/>
          </Form.Item>

          <Form.Item
            className='form-items'
            name="password"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu contraseña',
              },
            ]}
          >
            <Input.Password placeholder='Contraseña'/>
          </Form.Item>

          <Form.Item className='form-button' wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
