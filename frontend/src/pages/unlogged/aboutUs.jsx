import React from 'react';
import '../../assets/styles/pages/aboutUS.css';
import Footer from '../../components/common/footer.jsx';
import Header from '../../components/common/header.jsx';
import jellyAccountant from '../../assets/images/jellyAccountant.jpeg';
import jellyTools from '../../assets/images/jellyTools.jpeg';
import jellyWall from '../../assets/images/jellyWall.jpeg';
import videoFondo from '../../assets/images/medumedusin.mp4';

const aboutUs=()=>{
  return(
     <div className='aboutUs-page'>
        <Header />
        <video autoPlay loop muted className='full-screen-background'>
            <source src={videoFondo} type="video/mp4" />
            Tu navegador no soporta el formato de video.
        </video>
        
        {/* Contenido de la página */}
        <div className="aboutUs-content">
        <section className="about-section">
          <div className="text-container">
            <h1>¿Quiénes somos?</h1>
            <p>Somos JellyJobs, una plataforma ágil que facilita la búsqueda de empleos. Te ayudamos a encontrar trabajos rápidamente y coordinar directamente con empleadores, ajustando fecha, horario y sueldo según tus habilidades y disponibilidad.</p>
          </div>
          <img src={jellyAccountant} alt="JellyJobs" className="about-img" />
        </section>

        <section className="about-section reverse">
          <img src={jellyTools} alt="JellyJobs" className="about-img" />
          <div className="text-container">
            <h1>¿Cómo podés unirte a la comunidad?</h1>
            <p>Unirte es simple. Solo necesitás enviar tu currículum y completar un formulario con tus datos. Nuestro equipo evaluará tu solicitud en menos de 24 horas, y recibirás una respuesta sobre si fuiste aceptado. ¡Luego, solo queda esperar!</p>
          </div>
        </section>

        <section className="about-section">
          <div className="text-container">
            <h1>¿Por qué nuestro nombre?</h1>
            <p>El nombre JellyJobs refleja agilidad y flexibilidad. Inspirados en las medusas, que se mueven con fluidez, nuestra plataforma conecta candidatos y empleadores de forma eficiente. Resalta nuestro enfoque en ofrecer oportunidades laborales rápidas y efectivas.</p>
          </div>
          <img src={jellyWall} alt="JellyJobs" className="about-img" />
        </section>
        </div>
        <Footer />
    </div>

    );
    
};
export default aboutUs;