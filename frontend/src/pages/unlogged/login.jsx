import { Form, Input, Button } from 'antd';
import '../../assets/styles/pages/login.css';
import React from 'react';
import gift1 from '../../assets/images/tenor.gif';
import fondo from '../../assets/images/ej1.jpg';
const Login = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    //backend
  };

  return (
    <div className='contein-login-page'>
      <img src={fondo} className='full-screen-background'></img>
      <div className='gift-img-part box'>
        <img src={gift1} alt="Gif" className="gift-image" />
      </div>
      <div className='form-part box'>
        <Form
          className='loginform'
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <h1 className='title-form'>Login</h1>
          <Form.Item
            className='form-items'
            label="Nombre"
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
            <Input />
          </Form.Item>

          <Form.Item
            className='form-items'
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu contraseña',
              },
            ]}
          >
            <Input.Password />
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
