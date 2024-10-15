import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';
import '../../assets/styles/components/header.css';
import logo from '../../assets/images/logo.png'; 

const Header = () => (
    <header className='header'>
        <a href="/" className='links logo-JellyJobs'>
            <img src={logo} alt="logo" />
        </a>
        <ConfigProvider>
            <Space className='buttons-log'>
                <Button
                    className='header-button'
                    href="joinUs" 
                    type="primary" 
                    size="large" 
                >
                    ¡Únete!
                </Button>
                <Button 
                    className='header-button'
                    href="/login" 
                    type="primary" 
                    size="large" 
                >
                    Login
                </Button>
            </Space>
        </ConfigProvider>
    </header>
);

export default Header;
