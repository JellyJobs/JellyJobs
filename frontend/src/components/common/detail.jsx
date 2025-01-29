import React from 'react';
import { Modal, Descriptions, Avatar, Button, Grid } from 'antd';
import { DownloadOutlined, CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { useBreakpoint } = Grid;

const DetalleTrabajador = ({ trabajador, onClose, visible }) => {
  const screens = useBreakpoint();
  
  if (!trabajador) return null;

  return (
    <Modal
      title={<span className="modal-title">DETALLE DEL TRABAJADOR</span>}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} icon={<CloseOutlined />}>
          Cerrar
        </Button>
      ]}
      width={screens.md ? 800 : '90%'}
      className="detalle-modal"
    >
      <div className="modal-content">
        <div className="avatar-section">
          <Avatar
            src={`http://localhost:8000${trabajador.imagenlink}`}
            size={150}
            className="avatar-detalle"
          />
          <h2>{trabajador.nombre || "No especificado"} {trabajador.apellido || ""}</h2>
          <h3>{trabajador.estadotrabajo?.toUpperCase() || "No especificado"}</h3>
        </div>

        <Descriptions column={2} bordered className="descripciones">
          <Descriptions.Item label="DNI">{trabajador.dni || "No especificado"}</Descriptions.Item>
          <Descriptions.Item label="Edad">{trabajador.edad || "No especificado"}</Descriptions.Item>
          <Descriptions.Item label="Teléfono">{trabajador.numtel || "No especificado"}</Descriptions.Item>
          <Descriptions.Item label="Email">{trabajador.email || "No especificado"}</Descriptions.Item>
          <Descriptions.Item label="Talle">{trabajador.talle || "No especificado"}</Descriptions.Item>
          <Descriptions.Item label="Uniforme">{trabajador.uniforme ? 'Sí' : 'No'}</Descriptions.Item>
          <Descriptions.Item label="Estado Contrato" span={2}>
            {trabajador.estadocontrato || "No especificado"}
          </Descriptions.Item>
          <Descriptions.Item label="Profesión" span={2}>
            {trabajador.idprofesion?.nombre || "No especificado"}
          </Descriptions.Item>
          <Descriptions.Item label="Localidad" span={2}>
            {trabajador.idlocalidad?.nombre || "No especificado"}
          </Descriptions.Item>
          <Descriptions.Item label="Descripción" span={2}>
            {trabajador.descripcion || "Sin descripción"}
          </Descriptions.Item>
          {trabajador.cvlink && (
            <Descriptions.Item label="CV" span={2}>
              <a 
                href={`http://localhost:8000${trabajador.cvlink}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button type="primary" icon={<DownloadOutlined />}>
                  Descargar CV
                </Button>
              </a>
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
    </Modal>
  );
};

DetalleTrabajador.propTypes = {
  trabajador: PropTypes.shape({
    imagenlink: PropTypes.string,
    nombre: PropTypes.string,
    apellido: PropTypes.string,
    dni: PropTypes.string,
    edad: PropTypes.number,
    numtel: PropTypes.string,
    email: PropTypes.string,
    talle: PropTypes.string,
    uniforme: PropTypes.bool,
    estadocontrato: PropTypes.string,
    estadotrabajo: PropTypes.string,
    idprofesion: PropTypes.shape({
      nombre: PropTypes.string,
    }),
    idlocalidad: PropTypes.shape({
      nombre: PropTypes.string,
    }),
    descripcion: PropTypes.string,
    cvlink: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default DetalleTrabajador;
