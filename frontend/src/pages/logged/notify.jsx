import React, { useEffect, useState, useCallback } from "react";
import { Drawer, List, Avatar, Spin } from "antd";
import { BellOutlined } from "@ant-design/icons";

const Notify = ({ visible, onClose }) => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotificaciones = useCallback(() => {
        setLoading(true);
        fetch("http://127.0.0.1:8000/api/notificaciones/")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener notificaciones");
                }
                return response.json();
            })
            .then(data => {
                setNotificaciones(data);
                setError(null);
            })
            .catch(error => {
                console.error("Error al obtener notificaciones:", error);
                setError("No se pudieron cargar las notificaciones. Inténtalo de nuevo más tarde.");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (visible) {
            fetchNotificaciones();
            const interval = setInterval(fetchNotificaciones, 30000);
            return () => clearInterval(interval);
        }
    }, [visible, fetchNotificaciones]);

    useEffect(() => {
        setUnreadCount(notificaciones.filter(notif => !notif.leida).length);
    }, [notificaciones]);

    return (
        <Drawer
            title={`Notificaciones ${unreadCount > 0 ? `(${unreadCount})` : ''}`}
            placement="right"
            onClose={onClose}
            open={visible}
            width={350}
            aria-live="polite"
        >
            {error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : loading ? (
                <Spin size="large" />
            ) : (
                <List
                    dataSource={notificaciones}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={<Avatar icon={<BellOutlined />} />}
                                title={<a href={item.link}>{item.titulo}</a>}
                                description={item.descripcion}
                            />
                        </List.Item>
                    )}
                />
            )}
        </Drawer>
    );
};

export default Notify;