import { Form, Input, Button } from 'antd';
import '../../assets/styles/pages/login.css';
import React from 'react';

const Login = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    //backend
  };

  return (
    <div className='login-page'>
      <Form
        className='loginform'
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
     
      >
        <h1>Login</h1>
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

        <Form.Item  className='form-button' wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
          Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;