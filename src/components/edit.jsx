// FormComponent.jsx
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './../scss/form.scss';

const FormComponent = ({ values, handleValues, handleSubmit, title = "Formulario de Pedido" }) => {
  const handleenviar = () => {
    Swal.fire({
      title: 'Producto pedido',
      text: 'El pedido ha sido enviado existosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (handleSubmit) {
      await handleSubmit(e);
    } else {
      try {
        const response = await axios.post(import.meta.env.VITE_ENDPOINT_BASE, values);
        console.log('Datos guardados:', response.data);
        handleenviar();
      } catch (error) {
        console.error('Error al guardar el pedido:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al guardar el pedido',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-6">
          <div className="formulario-container">
            <h2 className="text-center mb-4">{title}</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre_completo" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre_completo"
                  name="nombre_completo"
                  value={values.nombre_completo}
                  onChange={handleValues}
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
                  value={values.telefono}
                  onChange={handleValues}
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
                  value={values.direccion}
                  onChange={handleValues}
                  placeholder="Ingrese su dirección completa"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="productos" className="form-label">Productos</label>
                <textarea
                  className="form-control"
                  id="productos"
                  name="productos"
                  value={values.productos}
                  onChange={handleValues}
                  placeholder="Describa los productos de su pedido"
                  rows="3"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="subtotal" className="form-label">Subtotal</label>
                  <input
                    type="number"
                    className="form-control"
                    id="subtotal"
                    name="subtotal"
                    value={values.subtotal}
                    onChange={handleValues}
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
                    value={values.total}
                    onChange={handleValues}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                {title === "Editar pedido" ? "Actualizar Pedido" : "Enviar Pedido"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

FormComponent.propTypes = {
  values: PropTypes.object,
  handleValues: PropTypes.func,
  handleSubmit: PropTypes.func,
  title: PropTypes.string
};

export default FormComponent;