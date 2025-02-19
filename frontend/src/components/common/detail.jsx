import React, { useState, useEffect } from 'react';
import { Modal, Descriptions, Avatar, Button, Grid, Input, Form, Select, Switch } from 'antd';
import { DownloadOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { ProfessionSelect } from '../../funcionalitys/profesionLista.jsx';
import { LocalidadLista } from '../../funcionalitys/LocalidadList.jsx';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const { useBreakpoint } = Grid;

const DetalleTrabajador = ({ trabajador, onClose, visible, onSave, profesiones, localidades }) => {
  const screens = useBreakpoint();
  const [isEditing, setIsEditing] = useState(false); 
  const [form] = Form.useForm(); 

  if (!trabajador) return null;

  const handleEditClick = () => {
    setIsEditing(true);
    const local= localidades.find(
      (locali)=> locali.nombre===trabajador.localidad
    );
    const localidadId = local? local.idlocalidad: null
    const profession = profesiones.find(
      (profession) => profession.nombre === trabajador.profesion
    );
    const professionId = profession ? profession.idprofesion : null;
    
    form.setFieldsValue({
      nombre: trabajador.nombre,
      apellido: trabajador.apellido,
      dni: trabajador.dni,
      edad: trabajador.edad,
      numtel: trabajador.numtel,
      email: trabajador.email,
      talle: trabajador.talle || null,
      idlocalidad: localidadId,
      idprofesion: professionId,
      descripcion: trabajador.descripcion,
      estadocontrato: trabajador.estadocontrato
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append('nombre', trabajador.nombre);
      formData.append('apellido', trabajador.apellido);
      formData.append('dni', values.dni);
      formData.append('email', values.email);
      formData.append('numtel', values.numtel);
      formData.append('idlocalidad', values.idlocalidad);
      formData.append('idprofesion', values.idprofesion);
      formData.append('edad', values.edad);
      formData.append('descripcion', values.descripcion);
      formData.append('talle', values.talle !== undefined ? values.talle : '');
      formData.append('estadocontrato', values.estado);

      const mensaje = `
        Nombre: ${trabajador.nombre}
        Apellido: ${trabajador.apellido}
        DNI: ${values.dni}
        Email: ${values.email}
        Teléfono: ${values.numtel}
        Localidad (ID): ${values.idlocalidad}
        Profesión (ID): ${values.idprofesion}
        Edad: ${values.edad}
        Descripción: ${values.descripcion}
        Talle: ${values.talle || "No especificado"}
        Estado del contrato: ${values.estado}
      `;
      alert(mensaje);

      const response = await fetch(`http://127.0.0.1:9001/app/trabajadores/${trabajador.dni}/`, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      let data;
      const responseText = await response.text();
      if (responseText) {
        data = JSON.parse(responseText);
      } else {
        data = {}; 
      }
      setIsEditing(false);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert(`Error al guardar los cambios: ${error.message}`);
    }
  };

  return (
    <Modal
      title={<span className="modal-title">DETALLE DEL TRABAJADOR</span>}
      visible={visible}
      onCancel={onClose}
      footer={[
        isEditing ? (
          <Button key="save" type="primary" onClick={handleSave}>
            Guardar
          </Button>
        ) : (
          <Button key="edit" onClick={handleEditClick} icon={<EditOutlined />}>
            Editar
          </Button>
        ),
        <Button key="back" onClick={onClose} icon={<CloseOutlined />}>
          Cerrar
        </Button>,
      ]}
      width={screens.md ? 800 : '90%'}
      className="detalle-modal"
    >
      <div className="modal-content">
        <div className="avatar-section">
          <Avatar
            src={`http://localhost:9001${trabajador.imagenlink}`}
            size={150}
            className="avatar-detalle"
          />
          <h2>{trabajador.nombre || "No especificado"} {trabajador.apellido || ""}</h2>
        </div>

        <Form form={form} layout="vertical">
          <Descriptions column={2} bordered className="descripciones">
            <Descriptions.Item label="DNI">
              {isEditing ? (
                <Form.Item name="dni" initialValue={trabajador.dni}>
                  <Input disabled />
                </Form.Item>
              ) : (
                trabajador.dni || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Edad">
              {isEditing ? (
                <Form.Item name="edad" initialValue={trabajador.edad}>
                  <Input />
                </Form.Item>
              ) : (
                trabajador.edad || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Teléfono">
              {isEditing ? (
                <Form.Item name="numtel" initialValue={trabajador.numtel}>
                  <Input />
                </Form.Item>
              ) : (
                trabajador.numtel || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              {isEditing ? (
                <Form.Item name="email" initialValue={trabajador.email}>
                  <Input />
                </Form.Item>
              ) : (
                trabajador.email || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Talle">
              {isEditing ? (
                <Form.Item name="talle" initialValue={trabajador.talle}>
                  <Input />
                </Form.Item>
              ) : (
                trabajador.talle || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Estado contrato" span={2}>
              {isEditing ? (
                <Form.Item name="estado" label="Estado" initialValue={trabajador.estadocontrato}>
                  <Select>
                    <Select.Option value="pendiente">Pendiente</Select.Option>
                    <Select.Option value="aceptado">Aceptado</Select.Option>
                    <Select.Option value="rechazado">Rechazado</Select.Option>
                  </Select>
                </Form.Item>
              ) : (
                trabajador.estadocontrato || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Profesión" span={2}>
              {isEditing ? (
                <Form.Item name="idprofesion" initialValue={trabajador.idprofesion?.idprofesion}>
                  <ProfessionSelect value={trabajador.idprofesion?.idprofesion} onChange={(value) => form.setFieldsValue({ idprofesion: value })} />
                </Form.Item>
              ) : (
                trabajador.profesion || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Localidad" span={2}>
              {isEditing ? (
                <Form.Item name="idlocalidad" initialValue={trabajador.idlocalidad?.idlocalidad}>
                  <LocalidadLista value={trabajador.idlocalidad?.idlocalidad} onChange={(value) => form.setFieldsValue({ idlocalidad: value })} />
                </Form.Item>
              ) : (
                trabajador.localidad || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Descripción" span={2}>
              {isEditing ? (
                <Form.Item name="descripcion" initialValue={trabajador.descripcion}>
                  <Input.TextArea />
                </Form.Item>
              ) : (
                trabajador.descripcion || "Sin descripción"
              )}
            </Descriptions.Item>

            {trabajador.cvlink && (
              <Descriptions.Item label="CV" span={2}>
                <a 
                  href={`http://localhost:9001${trabajador.cvlink}`} 
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
        </Form>
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
  onSave: PropTypes.func.isRequired,
  profesiones: PropTypes.array.isRequired,
  localidades: PropTypes.array.isRequired,
};

export default DetalleTrabajador;
