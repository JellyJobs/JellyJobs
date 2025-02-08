import '../../assets/styles/pages/joinUs.css';
import { Form, Input, Button, DatePicker, Upload, Checkbox, notification } from 'antd';
import { UploadOutlined, LeftCircleFilled } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import videoFondo from '../../assets/images/medumedusin.mp4';
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { ProfessionSelect } from '../../funcionalitys/profesionLista';
import { LocalidadLista } from '../../funcionalitys/LocalidadList';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const { TextArea } = Input;

export default function Create() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imagenPresentacion, setImagenPresentacion] = useState(null);
    const [cv, setCv] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("access_token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const decoded = jwtDecode(token);
            if (!decoded.email) {
                navigate("/login");
            }
        } catch (error) {
            navigate("/login");
        }
    }, []);

    const calcularEdad = (fechaNacimiento) => dayjs().diff(fechaNacimiento, "year");

    const disableFutureDates = (current) => {
        const today = dayjs();
        const minDate = today.subtract(18, 'year');
        return current && (current.isAfter(today) || current.isAfter(minDate));
    };

    const manejarFotoSubida = (info) => {
        if (info.file.status === "done" || info.file.status === "uploading") return;
        if (info.file.size > 2 * 1024 * 1024) {
            notification.error({ message: 'Archivo muy grande', description: 'La imagen debe ser menor de 2MB.' });
            return;
        }
        setImagenPresentacion(info.file.originFileObj);
    };

    const manejarCVSubido = (info) => {
        if (info.file.status === "done" || info.file.status === "uploading") return;
        if (info.file.size > 5 * 1024 * 1024) {
            notification.error({ message: 'Archivo muy grande', description: 'El CV debe ser menor de 5MB.' });
            return;
        }
        setCv(info.file.originFileObj);
    };

    const submitData = async (values) => {
        setLoading(true);
        const edad = calcularEdad(values.fechaNacimiento);

        if (!imagenPresentacion || !cv) {
            notification.error({ message: 'Error de validación', description: 'Sube una foto y un CV.' });
            setLoading(false);
            return;
        }

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        formData.append('edad', edad);
        formData.append('imagenlink', imagenPresentacion);
        formData.append('cvlink', cv);

        try {
            const response = await fetch("http://127.0.0.1:8000/app/crear-trabajador/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                },
                body: formData,
            });

            if (!response.ok) throw new Error("Error al enviar los datos");

            notification.success({ message: "Éxito", description: "Datos enviados correctamente." });
            form.resetFields();
            navigate("/");

        } catch (error) {
            notification.error({ message: "Error", description: "Hubo un problema al enviar los datos." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='JoinUs-page-contein'>
            <video autoPlay loop muted className='full-screen-background'>
                <source src={videoFondo} type="video/mp4" />
                Tu navegador no soporta el formato de video.
            </video>
            <Link to="#" className="back-arrow" onClick={() => navigate(-1)}>
                <LeftCircleFilled />
            </Link>
            <div className='contain-form'>
                <Form form={form} onFinish={submitData}>
                    <h1 className='form-title'>Registrar un trabajador</h1>
                    <div className='form-row'>
                        <Form.Item name="nombre" rules={[{ required: true, message: 'Ingresa tu nombre' }]}>
                            <Input placeholder="Nombre" />
                        </Form.Item>
                        <Form.Item name="apellido" rules={[{ required: true, message: 'Ingresa tu apellido' }]}>
                            <Input placeholder="Apellido" />
                        </Form.Item>
                        <Form.Item name="dni" rules={[{ required: true, message: 'Ingresa tu DNI' }]}>
                            <Input placeholder="DNI" />
                        </Form.Item>
                    </div>

                    <div className='form-row'>
                        <Form.Item name="email" rules={[{ type: 'email', required: true, message: 'Ingresa un email válido' }]}>
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="telefono" rules={[{ required: true, pattern: /^[0-9]+$/, message: 'Solo números' }]}>
                            <Input placeholder="Teléfono" />
                        </Form.Item>
                        <Form.Item name="localidad">
                            <LocalidadLista onChange={(value) => form.setFieldsValue({ localidad: value })} />
                        </Form.Item>
                    </div>

                    <div className="form-row">
                        <Form.Item name="fechaNacimiento" label="Fecha de Nacimiento" rules={[{ required: true, message: 'Selecciona tu fecha' }]}>
                            <DatePicker placeholder="Selecciona la fecha" disabledDate={disableFutureDates} />
                        </Form.Item>
                    </div>

                    <h2 className='form-subtitle'>Descripción del trabajador</h2>

                    <Form.Item name="profesion">
                        <ProfessionSelect onChange={(value) => form.setFieldsValue({ profesion: value })} />
                    </Form.Item>

                    <Form.Item name="descripcion" rules={[{ required: true, message: 'Ingresa una descripción' }]}>
                        <TextArea placeholder='Descripción' rows={4} style={{ resize: 'none', minHeight: '120px', backgroundColor: 'transparent' }} />
                    </Form.Item>

                    <Form.Item name="foto-presentacion">
                        <Upload name="archivo" listType="picture" beforeUpload={() => false} onChange={manejarFotoSubida}>
                            <Button icon={<UploadOutlined />}>Subir foto de presentación</Button>
                        </Upload>
                    </Form.Item>

                    {imagenPresentacion && (
                        <div className="imagen-preview">
                            <img src={URL.createObjectURL(imagenPresentacion)} alt="Vista previa" className="foto-preview" />
                            <p>Esta será tu foto de presentación.</p>
                        </div>
                    )}

                    <Form.Item name="curriculum-vitae">
                        <Upload name="archivo" listType="picture" beforeUpload={() => false} onChange={manejarCVSubido}>
                            <Button icon={<UploadOutlined />}>Subir Curriculum</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="terminos" valuePropName="checked">
                        <Checkbox>Acepto los <a href="/terms">términos y condiciones</a></Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>Enviar</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
