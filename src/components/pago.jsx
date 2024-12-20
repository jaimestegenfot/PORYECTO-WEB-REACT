// FormComponent.jsx
import { useState, useEffect } from 'react';
import { addDoc } from 'firebase/firestore';
import { coconaCollection } from '../config/firebase';
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './../scss/form.scss';
import { useNavigate } from 'react-router-dom';

const FormComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_completo: '',
    telefono: '',
    direccion: '',
    productos: [],
    total: 0,
    userId: '',
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData || !userData) {
      Swal.fire({
        title: 'Error',
        text: 'Debes iniciar sesión para realizar un pedido',
        icon: 'error',
        confirmButtonText: 'Ir a login'
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carritoData.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    setFormData(prev => ({
      ...prev,
      productos: carritoData,
      total: total,
      userId: userData.id,
      nombre_completo: userData.nombre || '',
    }));
  }, [navigate]);

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
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData || !userData) {
        throw new Error('No se encontró ID de usuario');
      }

      await addDoc(coconaCollection, {
        ...formData,
        userId: userData.gmail,
        fecha: new Date(),
        estado: 'pendiente'
      });

      localStorage.removeItem('carrito');

      Swal.fire({
        title: 'Pedido realizado',
        text: 'El pedido ha sido enviado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      navigate('/carta');

      setFormData({
        nombre_completo: '',
        telefono: '',
        direccion: '',
        productos: [],
        total: 0,
        userId: '',
      });

    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo procesar el pedido',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-12 col-lg-6">
          <div className="formulario-container">
            <h2 className="text-center mb-4">Finalizar Compra</h2>
            
            <div className="mb-4">
              <h4>Resumen del pedido</h4>
              {formData.productos.map((item, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <span>{item.nombre} x {item.cantidad}</span>
                  <span>S/. {(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-2 fw-bold">
                Total a pagar: S/. {formData.total.toFixed(2)}
              </div>
            </div>

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
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="direccion" className="form-label">Dirección de entrega</label>
                <input
                  type="text"
                  className="form-control"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 mt-3"
                disabled={formData.productos.length === 0}
              >
                Confirmar Pedido
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;