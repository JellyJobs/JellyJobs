import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";

const { Option } = Select;

export const ProfessionSelect = ({ onChange, value}) => {
  const [professions, setProfessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfessions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/app/profesionlista/'); // URL del backend Django
      if (!response.ok) {
        throw new Error("Error al obtener las profesiones");
      }
      const data = await response.json();
      setProfessions(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessions();
  }, []);

  if (loading) {
    return <Spin />;
  }

  return (
    <Select placeholder="Selecciona una profesión" onChange={onChange} value={value}>
      {professions.map((profession) => (
        <Option key={profession.idprofesion} value={profession.idprofesion}>
          {profession.nombre}
        </Option>
      ))}
    </Select>
  );
};
