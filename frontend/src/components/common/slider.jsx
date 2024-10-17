import React, { useEffect } from 'react';
import '../../assets/styles/components/slider.css'; 
import { Link } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import jellyChef from '../../assets/images/jellyChef.jpeg'
import jellyStudy from '../../assets/images/jellyStudy.jpeg'
import jellyWorking from '../../assets/images/jellyWorking.jpeg'

const Slider = () => {
  useEffect(() => {
    const btnRight = document.querySelector(".carousel__rightBtn"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");
    let intervalId;
    if (btnRight) {
      btnRight.addEventListener("click", moveToRight);
    } else {
      console.log("The slider button isn't working");
    }

    function startSlider() {
      intervalId = setInterval(moveToRight, 10000);
    }

    function resetSlider() {
      clearInterval(intervalId); 
      startSlider(); 
    }

    startSlider();
  
    let counter = 0,
      widthImg = 100 / sliderSection.length;

    function moveToRight() {
      counter++;
      if (counter >= sliderSection.length) {
        counter = 0;
      }
      let operacion = widthImg * counter;
      if (slider) {
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "all ease 2s";
      } else {
        console.log("Slider variable on home-functionality.js doesn't exist");
      }
    }

    window.addEventListener('focus', resetSlider);

    return () => {
      clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
      if (btnRight) {
        btnRight.removeEventListener("click", moveToRight); // Elimina el event listener al desmontar
      }
    };
  }, []);

  return (
    <div className="carousel">
      <div className="carousel__presentation">
        <h1>Bienvenido a JellyJobs</h1>
        <p>¡Conectate con las mejores oportunidades laborales, tan solo registrándote!</p>
        <Link to="joinUs" className="slider-button">¡Únete!</Link>
      </div>
      <div className="carousel__carouseles" id="slider">
        <section className="slider-section">
          <img src={jellyWorking} alt="jellyJobs" draggable="false" />
        </section>
        <section className="slider-section">
          <img src={jellyChef} alt="jellyJobs" draggable="false" />
        </section>
        <section className="slider-section">
          <img src={jellyStudy} alt="jellyJobs" draggable="false" />
        </section>
        <div className="dark" />
      </div>
      <div className="carousel__rightBtn"><RightOutlined /><i className="bi bi-chevron-right" /></div>
    </div>
  );
};

export default Slider;
