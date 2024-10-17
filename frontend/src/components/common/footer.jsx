import React from 'react';
import { InstagramOutlined, FacebookFilled, TwitterOutlined, MailOutlined } from '@ant-design/icons';
import '../../assets/styles/components/footer.css'; // Asegúrate de tener un archivo CSS para estilos

const Footer = () => {
  return (
    <footer className="footer">
      <div className="icons-container">
        <InstagramOutlined className="footer-icon" />
        <FacebookFilled className="footer-icon" />
        <TwitterOutlined className="footer-icon" />
        <MailOutlined className="footer-icon" />
      </div>
      <hr className="divider" />
      <nav className="footer-links">
        <a href="/terms">Términos y Condiciones</a>
        <a href="/privacy">Política de Privacidad</a>
        <a href="/contract">Condiciones de Contratación</a>
        <a href="/faq">Preguntas Frecuentes</a>
      </nav>
    </footer>
  );
};

export default Footer;
