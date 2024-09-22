import '../../../assets/styles/pages/landing.css';
import React from 'react';
import { Layout, Button } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import {ConfigProvider, Space } from 'antd';
const { Header, Footer } = Layout;

export default function Landing() {
  return (
    <div>
      <Header className='landing'>
        <a href="/"> <img src="frontend/public/monfroperro.jpeg" alt="Logo de nuestra organizacion" /> </a>
      <ConfigProvider>
      <Space className='buttons-log'>
        <Button
          type="primary" 
          size="large" 
          className="linear-gradient-button"
        >
          ¡Unetenos!
        </Button>
        <Button size="large" className='black-linear-button'>Login</Button>
      </Space>
    </ConfigProvider>



      </Header>



      <h1>Landing</h1>



      
      <Footer className='footer'>
        <ol classname='contein-logo-footer'>
          <ul className='logo-footer'><a href='https://www.instagram.com/balduzzivo/'><img src="../images/inta.jpeg" alt="instagram" /></a></ul>
          <ul className='logo-footer'><a href=''><img src="../images/tiwtter.jpeg" alt="twitter" /></a></ul>
          <ul className='logo-footer'><a href=''><img src="../images/gmail.webp" alt="gmail" /></a></ul>
        </ol>



      </Footer>
    </div>
  );
}