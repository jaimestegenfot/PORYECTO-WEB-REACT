import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProductos } from "../services/productos"
import ProductsTable from "../components/table";
import Swal from 'sweetalert2';
import '../scss/listpedidos.scss';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Modal, Button } from 'react-bootstrap';

const ListView = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    useEffect(() => {
        const fetchPedidosPendientes = async () => {
            try {
                const pedidosRef = collection(db, 'pedidos');
                const q = query(pedidosRef, where("estado", "==", "pendiente"));
                const querySnapshot = await getDocs(q);
                
                const pedidosData = querySnapshot.docs.map(doc => {
                    const data = {
                        id: doc.id,
                        ...doc.data()
                    };
                    // Intentamos parsear el campo productos si existe
                    if (data.productos && typeof data.productos === 'string') {
                        try {
                            data.productos = JSON.parse(data.productos);
                        } catch (e) {
                            console.error('Error al parsear productos:', e);
                        }
                    }
                    return data;
                });
                
                setProductos(pedidosData);
            } catch (error) {
                console.error('Error al cargar los pedidos:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudieron cargar los pedidos pendientes',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPedidosPendientes();
    }, []);

    const handleShowDetails = (pedido) => {
        setSelectedPedido(pedido);
        setShowModal(true);
    };

    return (
        <>
            <div className="col-12 col-md-10" id="list-pedidos">
                <h2 id="lista" className="text-center mb-4">Lista de Pedidos</h2>
                <div className="table-responsive">
                    <ProductsTable 
                        productos={productos} 
                        setProductos={setProductos}
                        onShowDetails={handleShowDetails}
                    />
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPedido && (
                        <div className="pedido-detalles">
                            <h5>Información del Cliente</h5>
                            <p><strong>Nombre:</strong> {selectedPedido.nombre_completo}</p>
                            <p><strong>Teléfono:</strong> {selectedPedido.telefono}</p>
                            <p><strong>Dirección:</strong> {selectedPedido.direccion}</p>
                            
                            <h5 className="mt-4">Productos</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unit.</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedPedido.productos && Array.isArray(selectedPedido.productos) && 
                                        selectedPedido.productos.map((producto, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {producto.imagen && (
                                                            <img 
                                                                src={producto.imagen} 
                                                                alt={producto.nombre}
                                                                style={{ width: '50px', marginRight: '10px' }}
                                                            />
                                                        )}
                                                        {producto.nombre}
                                                    </div>
                                                </td>
                                                <td>{producto.cantidad}</td>
                                                <td>S/. {producto.precio}</td>
                                                <td>S/. {(producto.precio * producto.cantidad).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="text-end">
                                            <strong>Total:</strong>
                                        </td>
                                        <td>
                                            <strong>S/. {selectedPedido.total}</strong>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ListView;
