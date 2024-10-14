import React from 'react';
import '../../assets/styles/pages/aboutUS.css';
import logo from  '../../assets/images/logo.png';
import medu from '../../assets/images/medu.jpg';
import { Layout, Button } from 'antd';
import gmail from '../../assets/images/gmail.webp';
import twitter from '../../assets/images/tw.png';
import instagram from '../../assets/images/inta.jpeg';
import trabajo from '../../assets/images/trabajo.jpg'
import ej2 from '../../assets/images/ej2.jpg'
const { Header, Footer } = Layout;
const aboutUs=()=>{
  

    return(
    
    
    <div className='aboutUs-Page'>
        <Header className='header'>
            <a href="/" className='links,logo-JellyJobs'><img src={logo} alt="logo" /></a>
        </Header>
        <section className='information-section1'>
            <dir className='contein-info-section1'>
                <h2>¿Quienes somos?</h2>
                <p>Somos JellyJobs una bolsa de trabajo rapida, donde podras encontrar empleos temporarios de manera rapida y pudiendo decidir y coordinar con el empleaodr para definir fecha,horario y sueldo acordes a tus habilidades y disponibilidad horaria.
                </p>
            </dir>
            <img src={trabajo} alt='medusas en el oceano'></img>
        </section>
            
        <section className='information-section2'>
            
            <img src={ej2} alt='medusas en el oceano'></img>
            <dir className='contein-info-section2'>
                <h2>¿Como podes unirte a la comunidads?</h2>
                <p>Los pasos a seguir son muy sencillos, lo unico que tenes que hacer es enviarnos tu curriculum vitea y llenar un formulario acerca de algunos datos personales. Estos seran evaluados por nuestro equipo dentro de las porximas 24 horas, y una vez pasado dicho tiempo te llegara una respuesta sobre si fuiste aceptado o no. Lo  unico que queda hacer despues de esto es esperar!</p>
            </dir>
        </section>
        <section className='information-section3'>
            
            
            <dir className='contein-info-section3'>
                <h2>¿Por que nuestro nombre?</h2>
                <p>En JellyJobs, nos inspiramos en la agilidad y adaptabilidad de las medusas, criaturas que navegan por los mares con fluidez y eficiencia. Al igual que una medusa se mueve rápidamente a través del agua, JellyJobs ofrece una plataforma de búsqueda de empleo diseñada para que tanto empleadores como candidatos puedan encontrar lo que buscan de manera rápida y efectiva.Nuestro nombre une estos dos conceptos: 'Jelly', representando la flexibilidad y rapidez, y 'Jobs', simbolizando nuestro enfoque en conectar oportunidades laborales de forma ágil."</p>
            </dir>
            <img src={medu} alt='medusas en el oceano'></img>
        </section>

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
    </Footer>
    </div>

    );
    
};
export default aboutUs;