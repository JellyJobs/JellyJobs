import '../../assets/styles/pages/joinUs.css';
import logo from  '../../assets/images/logo.png';
import { Form, Input, Button, Layout, DatePicker, Select, Upload,} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import videoFondo from '../../assets/images/medumedusin.mp4';
import React, {useState} from 'react';
import dayjs from 'dayjs';
const { Option } = Select;
const { Header, Footer } = Layout;
const { TextArea } = Input;
const empleos = [
    "Abogado", "Ingeniero en Sistemas", "Médico", "Arquitecto", "Profesor",
    "Enfermero", "Psicólogo", "Contador", "Químico", "Biólogo", "Economista",
    "Abogado Penalista", "Ingeniero Civil", "Diseñador Gráfico", "Programador Web",
    "Desarrollador de Software", "Analista de Sistemas", "Investigador", 
    "Marketing Digital", "Odontólogo", "Veterinario", "Farmacéutico", 
    "Ingeniero Eléctrico", "Ingeniero Mecánico", "Piloto", "Administrador de Empresas", 
    "Técnico en Electrónica", "Chef", "Cocinero", "Mesero", "Barbero", 
    "Estilista", "Mecánico Automotriz", "Electricista", "Plomero", "Carpintero", 
    "Albañil", "Pintor", "Cerrajero", "Ingeniero Químico", "Fotógrafo", 
    "Periodista", "Redactor", "Traductor", "Intérprete", "Fisioterapeuta", 
    "Nutricionista", "Entrenador Personal", "Soldador", "Jardinero", 
    "Guardia de Seguridad", "Bombero", "Policía", "Militar", "Banquero", 
    "Agente de Seguros", "Corredor de Bolsa", "Consultor", "Asesor Financiero", 
    "Gestor de Proyectos", "Gerente de Ventas", "Desarrollador de Videojuegos", 
    "Analista de Datos", "Ingeniero de Redes", "Especialista en Ciberseguridad", 
    "Terapeuta", "Piloto de Drones", "Agrónomo", "Músico", "Artista Plástico"
].sort();

export default function JoinUs() {
    const [filtroEmpleo, setFiltroEmpleo] = useState('');
    const [imagenPresentacion, setImagenPresentacion] = useState(null); 
    const [mensajeCV, setMensajeCV] = useState('');

    const manejarBusqueda = (value) => {
        setFiltroEmpleo(value);
    };

    const disableFutureDates = (current) => {
        const today = dayjs(); // Obtener la fecha actual
        const yearsAgo = today.subtract(18, 'year'); // Obtener la fecha hace 18 años
        return current && (current.isAfter(today) || current.isSame(today, 'day') || current.isAfter(yearsAgo));
    };
    
    const empleosFiltrados = empleos.filter((empleo) =>
        empleo.toLowerCase().includes(filtroEmpleo.toLowerCase())
    );

    const manejarFotoSubida = (info) => {
        if (info.fileList.length > 0) {
            setImagenPresentacion(info.fileList[0].originFileObj); // Guardar la imagen subida
        } else {
            setImagenPresentacion(null); // Reiniciar si no hay imagen
        }
        return info.fileList;
    };

    const manejarCVSubido = (info) => {
        if (info.fileList.length > 0) {
            setMensajeCV('Nuestros administradores revisarán tu currículum.'); // Mensaje al subir el CV
        } else {
            setMensajeCV(''); // Reiniciar el mensaje si no hay CV
        }
        return info.fileList;
    };

    return (

    <div className='JoinUs-page-contein'>
        <video autoPlay loop muted className='full-screen-background'>
            <source src={videoFondo} type="video/mp4" />
            Tu navegador no soporta el formato de video.
        </video>
        <Header className='header'>
            <a href="/" className='links,logo-JellyJobs'><img src={logo} alt="logo" /></a>
        </Header>
        <div className='contain-form'>
            <Form >
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
                {/* Nombre de Localidad */}
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
                        disabledDate={disableFutureDates}> // Aquí se aplica la función
                    </DatePicker>
                </Form.Item>
                </div>
            </div>

        <h2 className='form-subtitle'>Cuéntanos sobre ti</h2>
                {/* Selección de Empleo */}
                <Form.Item
                    name="empleo"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, selecciona tu empleo.',
                        },
                    ]}
                >
                    <Select
                        placeholder="Selecciona tu empleo"
                        onSearch={manejarBusqueda}
                        showSearch
                        filterOption={false}
                    >
                        {empleosFiltrados.map((empleo) => (
                            <Option key={empleo} value={empleo}>
                                {empleo}
                            </Option>
                        ))}
                    </Select>
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
        

        {/* Botón de enviar */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='buttom-item'>
            <Button type="submit" id="joinUsButton">Enviar</Button>
        </Form.Item>
                
            </Form>
        </div>
    </div>

    )

}