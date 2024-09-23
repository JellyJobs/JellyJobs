import '../../../assets/styles/pages/landing.css';
import React from 'react';
import { Layout, Button } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';
import {ConfigProvider, Space } from 'antd';

const { Header, Footer } = Layout;

export default function Landing() {
  return (
    <div>
      <Header className='header'>
        <div className='logo-JellyJobs'><a href="/" className='links'></a></div>
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
        {/*<h2>informacion</h2>*/}
        <div className='logo-insta'><a href='https://www.instagram.com' className='links'></a></div>
        <div className='logo-gmail'><a href='https://x.com' className='links'></a></div>
        <div className='logo-tw'><a href='https://mail.google.com' className='links'></a></div>
        

      </Footer>
    </div>
  );
}