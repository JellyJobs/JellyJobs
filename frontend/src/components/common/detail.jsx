import React, { useState } from 'react';
import { Modal, Descriptions, Avatar, Button, Grid, Input, Form, Select, Switch } from 'antd';
import { DownloadOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {ProfessionSelect} from '../../funcionalitys/profesionLista.jsx'
import {LocalidadLista} from '../../funcionalitys/LocalidadList.jsx'

const { useBreakpoint } = Grid;

const DetalleTrabajador = ({ trabajador, onClose, visible, onSave, profesiones, localidades }) => {
  const screens = useBreakpoint();
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos en modo edición
  const [form] = Form.useForm(); // Usamos Form para manejar el estado del formulario

  if (!trabajador) return null;

  // Maneja el cambio de estado de edición
  const handleEditClick = () => {
    setIsEditing(true);
    form.setFieldsValue(trabajador);

  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      fetch(`http://localhost:8000/api/trabajadores/${trabajador.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          onSave(data);  // Actualizar los datos en el componente principal si es necesario
          setIsEditing(false);  // Salir del modo edición
        })
        .catch((error) => {
          console.error('Error al guardar:', error);
          // Mostrar un mensaje de error si lo prefieres
        });
    });
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
            src={`http://localhost:8000${trabajador.imagenlink}`}
            size={150}
            className="avatar-detalle"
          />
          <h2>{trabajador.nombre || "No especificado"} {trabajador.apellido || ""}</h2>
          <h3>{trabajador.estadotrabajo?.toUpperCase() || "No especificado"}</h3>
        </div>

        <Form form={form} layout="vertical">
          <Descriptions column={2} bordered className="descripciones">
            <Descriptions.Item label="DNI">
              {isEditing ? (
                <Form.Item name="dni" initialValue={trabajador.dni}>
                  <Input />
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

            <Descriptions.Item label="Uniforme">
              {isEditing ? (
                <Form.Item name="uniforme" initialValue={trabajador.uniforme}>
                  <Switch checked={trabajador.uniforme} />
                </Form.Item>
              ) : (
                trabajador.uniforme ? 'Sí' : 'No'
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Estado Contrato" span={2}>
              {isEditing ? (
                <Form.Item name="estadocontrato" initialValue={trabajador.estadocontrato}>
                  <Input />
                </Form.Item>
              ) : (
                trabajador.estadocontrato || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Profesión" span={2}>
              {isEditing ? (
                <Form.Item name="idprofesion" initialValue={trabajador.idprofesion?.idprofesion}>
                  <ProfessionSelect onChange={(value) => form.setFieldsValue({ idprofesion: value })} />
                </Form.Item>
              ) : (
                trabajador.profesion || "No especificado"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Localidad" span={2}>
              {isEditing ? (
                <Form.Item name="idlocalidad" initialValue={trabajador.idlocalidad?.idlocalidad}>
                  <LocalidadLista onChange={(value) => form.setFieldsValue({ idlocalidad: value })} />
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
  onSave: PropTypes.func.isRequired,  // Función para guardar los cambios
  profesiones: PropTypes.array.isRequired,  // Lista de profesiones para el Select
  localidades: PropTypes.array.isRequired,  // Lista de localidades para el Select
};

export default DetalleTrabajador;

