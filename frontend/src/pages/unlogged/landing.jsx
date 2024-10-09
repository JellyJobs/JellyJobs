import '../../assets/styles/pages/landing.css';
import React, { useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import { ConfigProvider, Space } from 'antd';
import gmail from '../../assets/images/gmail.webp';
import twitter from '../../assets/images/tw.png';
import instagram from '../../assets/images/inta.jpeg';
import logo from  '../../assets/images/logo.png';
import ej1 from '../../assets/images/ej1.jpg';
import ej2 from '../../assets/images/ej2.jpg';
import ej3 from '../../assets/images/ej3.jpg';
import slider from '../../components/common/slider'; 
import '../../assets/styles/components/slider.css';

const { Header, Footer } = Layout;

export default function Landing() {
  
  let [executeEffect, setExecutEffect] = useState(true);

  useEffect(() => {
    if (executeEffect) {
      slider();
      setExecutEffect(false);  
    }
  }, [executeEffect]);

  return (
    <div>
      <Header className='header'>
        <a href="/" className='links,logo-JellyJobs'><img src={logo} alt="logo" /></a>
        <ConfigProvider>
          <Space className='buttons-log'>
            <Button
              href="joinUs" 
              type="primary" 
              size="large" 
              className="linear-gradient-button"
            >
              ¡Únete!
            </Button>
            <Button 
              href="login" 
              type="primary" 
              size="large" 
              className="linear-gradient-button"
            >
              Login
            </Button>
          </Space>
        </ConfigProvider>
      </Header>

      <div> 
        <div className="carousel">
          <div className="carousel__presentation">
            <h1>Bienvenido a JellyJobs</h1>
            <p>Postúlate a miles de trabajos en todo el mundo al instante, tan solo con tu información.</p>
          </div>
          <div className="carousel__carouseles" id="slider">
            <section className="slider-section">
              <img src={ej1} draggable="false" />
            </section>
            <section className="slider-section">
              <img src={ej2} draggable="false" />
            </section>
            <section className="slider-section">
              <img src={ej3} draggable="false" />
            </section>
            <div className="dark" />
          </div>
          <div className="carousel__rightBtn"><i className="bi bi-chevron-right" /></div>
        </div>
      </div>

      <Footer className='footer'>
  <h2>Información</h2>
  <nav className="footer-nav">
    <div className="footer-item">
      <a href='https://www.instagram.com/'><img src={instagram} alt="Instagram" className='logo' /></a>
      <span className="footer-text">Instagram</span>
    </div>
    <div className="footer-item">
      <a href='https://www.google.com/intl/es-419/gmail/about/'><img src={gmail} alt="Gmail" className='logo' /></a>
      <span className="footer-text">Gmail</span>
    </div>
    <div className="footer-item">
      <a href='https://x.com/?lang=es'><img src={twitter} alt="Twitter" className='logo' /></a>
      <span className="footer-text">Twitter</span>
    </div>
  </nav>
  <ConfigProvider>
    <Button  href="/aboutUs" 
              type="primary" 
              size="large" 
              className="linear-gradient-button,about-ass-button-footer"> Quienes somos </Button>
  </ConfigProvider>
</Footer>

    </div>
  );
}
