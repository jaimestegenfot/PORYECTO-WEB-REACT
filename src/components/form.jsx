// FormComponent.jsx
import { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './../scss/form.scss';


const FormComponent = () => {



  const handleenviar = () => {
    Swal.fire({
      title: 'Producto pedido',
      text: 'El pedido ha sido enviado existosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };

  const [formData, setFormData] = useState({
    nombre_completo: '',
    telefono: '',
    direccion: '',
    productos: '',
    subtotal: 0,
    total: 0
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
      const response = await axios.post(import.meta.env.VITE_ENDPOINT_BASE, formData);
      console.log('Datos guardados:', response.data);
      setFormData({
        nombre_completo: '',
        telefono: '',
        direccion: '',
        productos: '',
        subtotal: 0,
        total: 0
      });
      handleenviar();

    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      alert('Error al guardar el pedido');
    }
  };

  const productos = [
    "Sudado de pescado",
    "Inchicapi",
    "Sopa de carachama",
    "Juane amazónico",
    "Patarashca",
    "Tacacho con cecina",
  ];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="formulario-container">
            <h2 className="text-center mb-4">Formulario de Pedido</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre_completo" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre_completo"
                  name="nombre_completo"
                  value={formData.nombre_completo}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre completo"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ingrese su número telefónico"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Ingrese su dirección completa"
                  required
                />
              </div>

              <div className="mb-3">
                  <label htmlFor="productos" className="form-label">Productos</label>
                  <select
                    className="form-control"
                    id="productos"
                    name="productos"
                    value={formData.productos}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione un producto</option>
                    {productos.map((producto, index) => (
                      <option key={index} value={producto}>
                        {producto}
                      </option>
                    ))}
                  </select>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="subtotal" className="form-label">Subtotal</label>
                  <input
                    type="number"
                    className="form-control"
                    id="subtotal"
                    name="subtotal"
                    value={formData.subtotal}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="total" className="form-label">Total</label>
                  <input
                    type="number"
                    className="form-control"
                    id="total"
                    name="total"
                    value={formData.total}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3" >
                Enviar Pedido
              </button>
              <button type="button" className="btn btn-danger w-100 mt-3" >
                Enviar Pedido
              </button>
              

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;