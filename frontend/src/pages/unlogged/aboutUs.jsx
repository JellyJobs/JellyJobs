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
            <p>Somos JellyJobs, una bolsa de trabajo rápida...</p>
          </div>
          <img src={jellyAccountant} alt="JellyJobs" className="about-img" />
        </section>

        <section className="about-section reverse">
          <img src={jellyTools} alt="JellyJobs" className="about-img" />
          <div className="text-container">
            <h1>¿Cómo podés unirte a la comunidad?</h1>
            <p>Los pasos a seguir son muy sencillos...</p>
          </div>
        </section>

        <section className="about-section">
          <div className="text-container">
            <h1>¿Por qué nuestro nombre?</h1>
            <p>En JellyJobs, nos inspiramos en la agilidad...</p>
          </div>
          <img src={jellyWall} alt="JellyJobs" className="about-img" />
        </section>
        </div>
        <Footer />
    </div>

    );
    
};
export default aboutUs;