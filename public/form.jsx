// FormComponent.jsx
import { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://673ba88696b8dcd5f3f710a6.mockapi.io/usuarios', formData);
      console.log('Datos guardados:', response.data);
      // Limpiar el formulario
      setFormData({
        nombre: '',
        email: '',
        mensaje: ''
      });
      alert('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      alert('Error al guardar los datos');
    }
  };

  return (
    <div className="formulario-container">
      <form onSubmit={handleSubmit}>
        <div className="campo-formulario">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormComponent;