import '../../assets/styles/pages/joinUs.css';
import logo from  '../../assets/images/logo.png';
import { Form, Input, Button, Layout, DatePicker, Select, Upload,} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import videoFondo from '../../assets/images/medumedusin.mp4';
import React from 'react';
const { Option } = Select;
const { Header, Footer } = Layout;
const { TextArea } = Input;

export default function joinUs() {
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
                <h1>Formulario de registro</h1>
                <Form.Item
                    className='form-items'
                    
                    name="Nombre"
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
                    className='form-items'
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
                {/* Email */}
                <Form.Item
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
                <Form.Item
                    name="fechaNacimiento"
                    rules={[{ required: true, message: 'Por favor, selecciona tu fecha de nacimiento.' }]}
                >
                    <DatePicker placeholder="Fecha de Nacimiento"></DatePicker>
                </Form.Item>


        <h2>Cuentanos sobre ti</h2>
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
            <Select placeholder="Selecciona tu empleo">
            <Option value="Abogado">Abogado</Option>
            <Option value="Ingeniero en Sistemas">Ingeniero en Sistemas</Option>
            <Option value="Médico">Médico</Option>
            <Option value="Arquitecto">Arquitecto</Option>
            <Option value="Profesor">Profesor</Option>
            <Option value="Enfermero">Enfermero</Option>
            <Option value="Psicólogo">Psicólogo</Option>
            <Option value="Contador">Contador</Option>
            <Option value="Químico">Químico</Option>
            <Option value="Biólogo">Biólogo</Option>
            <Option value="Economista">Economista</Option>
            <Option value="Abogado Penalista">Abogado Penalista</Option>
            <Option value="Ingeniero Civil">Ingeniero Civil</Option>
            <Option value="Diseñador Gráfico">Diseñador Gráfico</Option>
            <Option value="Programador Web">Programador Web</Option>
            <Option value="Desarrollador de Software">Desarrollador de Software</Option>
            <Option value="Analista de Sistemas">Analista de Sistemas</Option>
            <Option value="Investigador">Investigador</Option>
            <Option value="Marketing Digital">Marketing Digital</Option>
            <Option value="Odontólogo">Odontólogo</Option>
            <Option value="Veterinario">Veterinario</Option>
            <Option value="Farmacéutico">Farmacéutico</Option>
            <Option value="Ingeniero Eléctrico">Ingeniero Eléctrico</Option>
            <Option value="Ingeniero Mecánico">Ingeniero Mecánico</Option>
            <Option value="Piloto">Piloto</Option>
            <Option value="Administrador de Empresas">Administrador de Empresas</Option>
            <Option value="Técnico en Electrónica">Técnico en Electrónica</Option>
            <Option value="Chef">Chef</Option>
            <Option value="Cocinero">Cocinero</Option>
            <Option value="Mesero">Mesero</Option>
            <Option value="Barbero">Barbero</Option>
            <Option value="Estilista">Estilista</Option>
            <Option value="Mecánico Automotriz">Mecánico Automotriz</Option>
            <Option value="Electricista">Electricista</Option>
            <Option value="Plomero">Plomero</Option>
            <Option value="Carpintero">Carpintero</Option>
            <Option value="Albañil">Albañil</Option>
            <Option value="Pintor">Pintor</Option>
            <Option value="Cerrajero">Cerrajero</Option>
            <Option value="Ingeniero Químico">Ingeniero Químico</Option>
            <Option value="Fotógrafo">Fotógrafo</Option>
            <Option value="Periodista">Periodista</Option>
            <Option value="Redactor">Redactor</Option>
            <Option value="Traductor">Traductor</Option>
            <Option value="Intérprete">Intérprete</Option>
            <Option value="Fisioterapeuta">Fisioterapeuta</Option>
            <Option value="Nutricionista">Nutricionista</Option>
            <Option value="Entrenador Personal">Entrenador Personal</Option>
            <Option value="Soldador">Soldador</Option>
            <Option value="Jardinero">Jardinero</Option>
            <Option value="Guardia de Seguridad">Guardia de Seguridad</Option>
            <Option value="Bombero">Bombero</Option>
            <Option value="Policía">Policía</Option>
            <Option value="Militar">Militar</Option>
            <Option value="Banquero">Banquero</Option>
            <Option value="Agente de Seguros">Agente de Seguros</Option>
            <Option value="Corredor de Bolsa">Corredor de Bolsa</Option>
            <Option value="Consultor">Consultor</Option>
            <Option value="Asesor Financiero">Asesor Financiero</Option>
            <Option value="Gestor de Proyectos">Gestor de Proyectos</Option>
            <Option value="Gerente de Ventas">Gerente de Ventas</Option>
            <Option value="Desarrollador de Videojuegos">Desarrollador de Videojuegos</Option>
            <Option value="Analista de Datos">Analista de Datos</Option>
            <Option value="Ingeniero de Redes">Ingeniero de Redes</Option>
            <Option value="Especialista en Ciberseguridad">Especialista en Ciberseguridad</Option>
            <Option value="Terapeuta">Terapeuta</Option>
            <Option value="Piloto de Drones">Piloto de Drones</Option>
            <Option value="Agrónomo">Agrónomo</Option>
            <Option value="Músico">Músico</Option>
            <Option value="Artista Plástico">Artista Plástico</Option>
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
            
            <TextArea  placeholder='Descripción' rows={4} />
        </Form.Item>

        

        {/* Subir Archivo */}
        <Form.Item
            name="foto-presentacion"
            valuePropName="fileList"
            getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
            rules={[
                {
                    required: true,
                    message: 'Por favor, ingresa una foto de presentacion.',
                },
                ]}
        >
            <Upload name="archivo" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Subir foto de presentacion</Button>
            </Upload>
        </Form.Item>
        <Form.Item
            name="acurriculum-vitae"
            valuePropName="fileList"
            getValueFromEvent={e => Array.isArray(e) ? e : e && e.fileList}
            rules={[
                {
                    required: true,
                    message: 'Por favor, ingresa su Currículum Vitae.',
                },
                ]}
            
        >
            <Upload name="archivo" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Subir CV</Button>
            </Upload>
        </Form.Item>

        

        {/* Botón de enviar */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Enviar
            </Button>
        </Form.Item>
                
            </Form>
        </div>
    </div>

    )

}
