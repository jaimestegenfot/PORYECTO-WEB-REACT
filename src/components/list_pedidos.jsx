import React, { useState, useEffect } from 'react';
import { Table, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';

const ListPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const url = import.meta.env.VITE_ENDPOINT_BASE;

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get(`${url}/cocona_pedidos`	);
        setPedidos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los pedidos');
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <Container className="mt-5 text-center text-danger">{error}</Container>;
  }

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4">Lista de Pedidos</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Productos</th>
            <th>Subtotal</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{new Date(pedido.fecha_pedido).toLocaleDateString()}</td>
              <td>{pedido.nombre_completo}</td>
              <td>{pedido.telefono}</td>
              <td>{pedido.direcion}</td>
              <td>{pedido.productos}</td>
              <td>${pedido.subtotal}</td>
              <td>${pedido.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListPedidos;
