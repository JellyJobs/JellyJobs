import '../../assets/styles/pages/landing.css';
import React from 'react';
import Slider from '../../components/common/slider.jsx';
import Footer from '../../components/common/footer.jsx';
import Header from '../../components/common/header.jsx';

export default function Landing() {
  return (
    <div>
      <Header />
      <Slider /> {Slider}
      <Footer />
    </div>
  );
}