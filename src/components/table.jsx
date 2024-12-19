/* eslint-disable react/prop-types */

import ColorCircle from "./colorcircle";
import {  Link } from "react-router-dom"
import Swal from "sweetalert2";
import { eliminarProducto } from "../services/productos";


const ProductsTable = ({ productos, setProductos }) => {
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
        await eliminarProducto(id); // Llama al servicio para eliminar el producto
        setProductos((prevProductos) => // función para actualizar el estado de los productos.
          prevProductos.filter((producto) => producto.id !== id)
        ); // Actualiza la lista
        Swal.fire("¡Eliminado!", "El pedido ha sido eliminado correctamente.", "success");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al eliminar el pedido.", "error");
        console.error("Error en handleEliminar:", error.message);
      }
    }
  };

  if (!productos || productos.length === 0) {
    return <p>No hay pedidos disponibles</p>;
  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Nombre Completo</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Productos</th>
          <th>Subtotal</th>
          <th>Total</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(({nombre_completo, telefono, direccion, productos, subtotal, total, id}) => (
          <tr key={id}>
            <td>{nombre_completo}</td>
            <td>{telefono}</td>
            <td>{direccion}</td>
            <td>{productos}</td>
            <td>{subtotal}</td>
            <td>s/.{total}</td>
            <td>
              <Link className="btn btn-primary btn-sm me-2" to={`/editarpedidos/${id}`}>
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
              <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(id)}>
                <i className="fa-sharp fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
