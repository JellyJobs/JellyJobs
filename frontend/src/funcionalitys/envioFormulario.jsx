const [loading, setLoading] = useState(false);

  const submitData = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:9001/api/professions/", {
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