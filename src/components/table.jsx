/* eslint-disable react/prop-types */
import {  Link } from "react-router-dom"
import Swal from "sweetalert2";
import { eliminarProducto } from "../services/productos";
import { Button } from 'react-bootstrap';


const ProductsTable = ({ productos, setProductos, onShowDetails }) => {
  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      try {
        await eliminarProducto(id);
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto.id !== id)
        );
        Swal.fire("¡Eliminado!", "El pedido ha sido eliminado correctamente.", "success");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al eliminar el pedido.", "error");
        console.error("Error en handleEliminar:", error.message);
      }
    }
  };

  if (!productos || productos.length === 0) {
    return <p>No hay pedidos pendientes disponibles</p>;
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Nombre Cliente</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Detalles del Pedido</th>
          <th>Estado</th>
          <th>Total</th>
          
        </tr>
      </thead>
      <tbody>
        {productos.map((pedido) => (
          <tr key={pedido.id}>
            <td>{pedido.nombre_completo}</td>
            <td>{pedido.telefono}</td>
            <td>{pedido.direccion}</td>
            <td>
              <Button 
                variant="info" 
                size="sm"
                onClick={() => onShowDetails(pedido)}
              >
                Ver Detalles
              </Button>
            </td>
            <td>
              <span className="badge bg-warning">
                {pedido.estado}
              </span>
            </td>
            <td>S/. {pedido.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
