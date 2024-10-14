import '../assets/styles/pages/home.css';
import React, { useEffect, useState  } from 'react';
import logo from  '../assets/images/logo.png';
import { Layout, Button, Menu,  } from 'antd';
import { SolutionOutlined, MenuOutlined, TeamOutlined, BellOutlined} from '@ant-design/icons';
import { Color } from 'antd/es/color-picker';
const {Header, Footer} = Layout;
//array de elementos del menu
// con children se pueden hacer submenus de un item del menu
const items =[
    {
        key:'postulaciones-trabajos',
        label: 'Postulaciones',
        icon: <SolutionOutlined />,
    },
    {
        key:'Trabajadores',
        label: 'Trabajadores',
        icon: <TeamOutlined />,
    },
    {
        key: 'Notificaciones',
        label: 'Notificaciones',
        icon: <BellOutlined />,
    },

];

export default function Home (){
    const [menuOpen,setMenuOpen]= useState(false);
    //funcion q me invierte el estado (menuOpen)
    const cambiaEstado = () => {
        setMenuOpen(!menuOpen);
    };
    //manejo de os items del menu (q pasaria cunado haces click)
    const onClick = (e) => {
        console.log('Click: ', e);
      };
    return (
        <div className='home-page'>
            <Header className='links-functions'>
                <Button className='menu-icon' onClick={cambiaEstado}>
                    <MenuOutlined className='icon-hamburguesa' style={{ fontSize: '24px'}} /></Button>
                {menuOpen && (
                <Menu
                    className='menu-functions'
                    onClick={onClick}
                    mode="inline"
                    items={items}
                    style={{ position: 'absolute', top: '64px', width: '256px' }}>
                </Menu>
                )};
                <a href="/" className='links,logo-JellyJobs-homePage'><img src={logo} alt="logo" /></a>
            </Header>
            <h2>Trabajadoresen sistema</h2>
            <section className='trabajadores-tabla-scroll'>
                <div className='element-trabajador'>element 1</div>
                <div className='element-trabajador'>element 2</div>
                <div className='element-trabajador'>element 3</div>
                <div className='element-trabajador'>element 4</div>
                <div className='element-trabajador'>element 5</div>
                <div className='element-trabajador'>element 6</div>
                <div className='element-trabajador'>element 7</div>
                <div className='element-trabajador'>element 8</div>
                <div className='element-trabajador'>element 9</div>
                <div className='element-trabajador'>element 10</div>
            </section>
        </div>
    )


}