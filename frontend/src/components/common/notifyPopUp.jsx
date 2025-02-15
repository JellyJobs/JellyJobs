import React, { useState, useEffect } from "react";
import '../../assets/styles/components/notifyPopUp.css';

const NotificationPopup = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch("http://localhost:8000/app/notificaciones/") // Cambia esto si el endpoint tiene otra URL
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((error) => console.error("Error al obtener notificaciones", error));
    }
  }, [isOpen]);

const handleNotificationClick = (notification) => {
  if (notification.tipo === "trabajador") {
    window.location.href = `/home`;
  } else if (notification.tipo === "solicitud") {
    window.location.href = `/requests`;
  }
};


  return (
    <div className={`popup-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>Notificaciones</h3>
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="notification-list">
          {notifications.length === 0 ? (
            <p className="no-notifications">No hay notificaciones nuevas</p>
          ) : (
            notifications.map((notification, index) => (
                <div 
                key={index} 
                className={`notification-item ${notification.tipo}`} 
                onClick={() => handleNotificationClick(notification)}
              >
                <p>
                  {notification.tipo === "trabajador" 
                    ? `👷 Nuevo Trabajador: ${notification.data.nombre}`
                    : `📄 Nueva Solicitud: ${notification.data.empresa}`}
                </p>
              </div>
              
                
              
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
;
