import '../../../assets/styles/pages/landing.css';
import React from 'react';
import { Layout, Button } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import {ConfigProvider, Space } from 'antd';
import gmail from '../../../assets/images/gmail.webp';
import twitter from '../../../assets/images/tw.png';
import instagram from '../../../assets/images/inta.jpeg';
import logo from  '../../../assets/images/logo.png';

const { Header, Footer } = Layout;

export default function Landing() {
  return (
    <div>
      <Header className='header'>
        <a href="/" className='links,logo-JellyJobs'><img src={logo} alt="logo" /></a>
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
        {/** logos con links de informacion */}
        <h2>informacion</h2>
        <nav>
          <a href='https://www.instagram.com/'><img src={instagram} alt="enlace instagram"  className='logo'/></a>
          <a href='https://www.google.com/intl/es-419/gmail/about/'><img src={gmail} alt="enlace gmail" className='logo'/></a>
          <a href='https://x.com/?lang=es'><img src={twitter} alt="enlace twitter" className='logo'/></a>
        </nav>
        <ConfigProvider>
          <Button type="primary" className='about-ass-button-footer'>primary</Button>
        </ConfigProvider>
        

      </Footer>
    </div>
  );
}