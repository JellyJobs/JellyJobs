import '../../assets/styles/pages/joinUs.css';
import { Form, Input, Button, DatePicker, Upload, Checkbox, notification} from 'antd';
import { UploadOutlined, LeftCircleFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import videoFondo from '../../assets/images/medumedusin.mp4';
import React, {useState} from 'react';
import dayjs from 'dayjs';
import { ProfessionSelect } from '../../funcionalitys/profesionLista'

const { TextArea } = Input;

export default function JoinUs() {
    const [loading, setLoading] = useState(false);
    const [imagenPresentacion, setImagenPresentacion] = useState(null); 
    const [mensajeCV, setMensajeCV] = useState('');


    const submitData = async (values) => {
        setLoading(true);
        try {
          const response = await fetch("http://127.0.0.1:8000/app/crear-trabajador/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
    
          if (!response.ok) {
            throw new Error("Error al enviar los datos");
          }
    
          const data = await response.json();
          notification.success({
            message: "Éxito",
            description: "Los datos se enviaron correctamente.",
          });
        } catch (error) {
          notification.error({
            message: "Error",
            description: "Hubo un problema al enviar los datos.",
          });
        } finally {
          setLoading(false);
        }
      };
    
 

    const disableFutureDates = (current) => {
        const today = dayjs();
        const yearsAgo = today.subtract(18, 'year');
        return current && (current.isAfter(today) || current.isSame(today, 'day') || current.isAfter(yearsAgo));
    };


    const manejarFotoSubida = (info) => {
        if (info.fileList.length > 0) {
            setImagenPresentacion(info.fileList[0].originFileObj); 
        } else {
            setImagenPresentacion(null); 
        }
        return info.fileList;
    };

    const manejarCVSubido = (info) => {
        if (info.fileList.length > 0) {
            setMensajeCV('Nuestros administradores revisarán tu currículum.');
        } else {
            setMensajeCV(''); 
        }
        return info.fileList;
    };

    return (

    <div className='JoinUs-page-contein'>
        <video autoPlay loop muted className='full-screen-background'>
            <source src={videoFondo} type="video/mp4" />
            Tu navegador no soporta el formato de video.
        </video>
        <Link Link to="/" className="back-arrow">
            <LeftCircleFilled />
        </Link>
        <div className='contain-form'>
            <Form onFinish={submitData}>
                <h1 className='form-title'>Registrate</h1>
                <div className='form-row'>
                <Form.Item
                    className='form-items-joinUs'
                    name="nombre"
                    rules={[
                    {
                        type: 'string',
                        message: 'Por favor, ingresa un nombre.',
                    },
                    {
                        required: true,
                        message: 'Por favor, ingresa tu nombre.',
                    },
                    ]}
                >
                    <Input placeholder="Nombre"/>
                </Form.Item>
                <Form.Item
                    className='form-items-joinUs'
                    name="apellido"
                    rules={[
                    {
                        type: 'string',
                        message: 'Por favor, ingresa un apellido.',
                    },
                    {
                        required: true,
                        message: 'Por favor, ingresa tu apellido.',
                    },
                    ]}
                >
                    <Input placeholder="Apellido" />
                </Form.Item>
                 {/* DNI */}
                <Form.Item
                    className='form-items-joinUs'
                    name="dni"
                    rules={[
                    {
                        required: true,
                        message: 'Por favor, ingresa tu DNI.',
                    },
                    ]}
                >
                    <Input placeholder="DNI"/>
                </Form.Item>
                </div>

                <div className='form-row'>
                {/* Email */}
                <Form.Item
                    className='form-items-joinUs'
                    name="email"
                    rules={[
                    {
                        type: 'email',
                        message: 'Por favor, ingresa un email válido.',
                    },
                    {
                        required: true,
                        message: 'Por favor, ingresa tu email.',
                    },
                    ]}
                >
                    <Input placeholder="Email"/>
                </Form.Item>
                {/* Número de teléfono */}
                <Form.Item
                    className='form-items-joinUs'
                    name="telefono"
                    rules={[
                    {
                        required: true,
                        message: 'Por favor, ingresa tu número de teléfono.',
                    },
                    {
                        pattern: new RegExp(/^[0-9]+$/),
                        message: 'Solo se permiten números.',
                    },
                    ]}
                >
                    <Input placeholder="Teléfono"/>
                </Form.Item>
                {/* Localidad */}
                <Form.Item
                    className='form-items-joinUs'
                    name="localidad"
                    rules={[
                    {
                        required: true,
                        message: 'Por favor, ingresa el nombre de tu localidad.',
                    },
                    ]}
                >
                    <Input placeholder="Localidad"/>
                </Form.Item>
                </div>
            <div className="form-row">
                {/* Fecha de Nacimiento */}
                <div className="birth-date-container">
                <Form.Item
                    className='birthDate'
                    name="fechaNacimiento"
                    label={<span style={{color: 'white'}}>Fecha de Nacimiento</span>}
                    rules={[{ required: true, message: 'Por favor, selecciona tu fecha de nacimiento.' }]}
                >
                    <DatePicker
                        className='date-picker-custom'
                        placeholder="Selecciona la fecha"
                        disabledDate={disableFutureDates}> 
                    </DatePicker>
                </Form.Item>
                </div>
            </div>

        <h2 className='form-subtitle'>Cuéntanos sobre ti</h2>
                {/* Selección de Empleo */}
                <Form.Item
                    name="profession"
                    rules={[{message: "Por favor selecciona una profesión" }]}
                    >
                    <ProfessionSelect />
                </Form.Item>
                
               {/* Descripción */}
               <Form.Item
                    name="descripcion"
                    rules={[
                    {
                        required: true,
                        message: 'Por favor, ingresa una descripción.',
                    },
                    ]}
                >
            
            <TextArea placeholder='Descripción' rows={4} style={{ resize: 'none', minHeight: '120px', backgroundColor: 'transparent' }} />
        </Form.Item>

                {/* Subir Archivo de Foto de Presentación */}
                <Form.Item
                    name="foto-presentacion"
                    valuePropName="fileList"
                    getValueFromEvent={manejarFotoSubida}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, ingresa una foto de presentación.',
                        },
                    ]}
                >
                    <Upload name="archivo" listType="picture" beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Subir foto de presentación</Button>
                    </Upload>
                </Form.Item>

                {/* Vista previa de la foto de presentación */}
                {imagenPresentacion && (
                    <div className="imagen-preview">
                        <img
                            src={URL.createObjectURL(imagenPresentacion)}
                            alt="Vista previa"
                            className="foto-preview"
                        />
                        <p>Esta será tu foto de presentación. ¡Asegura que te veas bien!</p>
                    </div>
                )}

                {/* Subir CV */}
                <Form.Item
                    name="curriculum-vitae"
                    valuePropName="fileList"
                    getValueFromEvent={manejarCVSubido}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, ingresa su Currículum Vitae.',
                        },
                    ]}
                >
                    <Upload name="archivo" listType="picture" beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Subir Curriculum</Button>
                    </Upload>
                </Form.Item>
                {mensajeCV && <p style={{ color: 'white' }}>{mensajeCV}</p>}
                
                <Form.Item
                    className="custom-checkbox"
                    name="terminos"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Debes aceptar los términos y condiciones para registrarte en JellyJobs.')),
                        },
                    ]}
                >
                    <Checkbox style={{ color: 'white' }}>
                        He leído y acepto los <a href="/terms" target="_blank" rel="noopener noreferrer">términos y condiciones.</a>
                    </Checkbox>
                </Form.Item>

        {/* Botón de enviar */}
        <Form.Item className="button-item">
            <button id="joinUsButton" type="submit" loading={loading}>
                Enviar
            </button>
        </Form.Item>
                
            </Form>
        </div>
    </div>

    )

}