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
                    <p>Somos JellyJobs, una bolsa de trabajo rápida, donde podrás encontrar empleos temporarios de manera rápida y pudiendo decidir y coordinar con el empleador para definir fecha, horario y sueldo acordes a tus habilidades y disponibilidad horaria.</p>
                </div>
            <img src={jellyAccountant} alt="JellyJobs" className="about-img" />
            </section>

            <section className="about-section reverse">
            <img src={jellyTools} alt="JellyJobs" className="about-img" />
                <div className="text-container">
                    <h1>¿Cómo podés unirte a la comunidad?</h1>
                    <p>Los pasos a seguir son muy sencillos, lo único que tenés que hacer es enviarnos tu curriculum vitae y llenar un formulario acerca de algunos datos personales. Estos serán evaluados por nuestro equipo dentro de las próximas 24 horas, y te llegará una respuesta sobre si fuiste aceptado o no. ¡Después, solo queda esperar!</p>
                </div>
            </section>

            <section className="about-section">
                <div className="text-container">
                    <h1>¿Por qué nuestro nombre?</h1>
                    <p>En JellyJobs, nos inspiramos en la agilidad y adaptabilidad de las medusas, criaturas que navegan por los mares con fluidez y eficiencia. Al igual que una medusa se mueve rápidamente a través del agua, JellyJobs ofrece una plataforma de búsqueda de empleo diseñada para que tanto empleadores como candidatos puedan encontrar lo que buscan de manera rápida y efectiva. Nuestro nombre une estos dos conceptos: 'Jelly', representando la flexibilidad y rapidez, y 'Jobs', simbolizando nuestro enfoque en conectar oportunidades laborales de forma ágil.</p>
                </div>
            <img src={jellyWall} alt="JellyJobs" className="about-img" />
            </section>
        </div>
        <Footer />
    </div>

    );
    
};
export default aboutUs;