import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button, Offcanvas } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Swal from 'sweetalert2';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/carta.scss';

const Carta = () => {
    const [platos, setPlatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const obtenerPlatos = async () => {
            try {
                const platosRef = collection(db, 'productos');
                const querySnapshot = await getDocs(platosRef);
                const platosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPlatos(platosData);
            } catch (error) {
                console.error("Error al obtener los platos:", error);
                setError("Error al cargar los platos");
            } finally {
                setLoading(false);
            }
        };

        obtenerPlatos();
        // Cargar carrito del localStorage
        const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
        setCarrito(carritoGuardado);
    }, []);

    const handleAddToCart = (plato) => {
        const carritoActual = [...carrito];
        const platoEnCarrito = carritoActual.find(item => item.id === plato.id);
        
        if (platoEnCarrito) {
            const carritoActualizado = carritoActual.map(item =>
                item.id === plato.id 
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );
            setCarrito(carritoActualizado);
            localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
        } else {
            const carritoActualizado = [...carritoActual, { ...plato, cantidad: 1 }];
            setCarrito(carritoActualizado);
            localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto añadido al carrito',
            showConfirmButton: false,
            timer: 1500,
            toast: true
        });
    };

    const handleRemoveFromCart = (platoId) => {
        const carritoActualizado = carrito.filter(item => item.id !== platoId);
        setCarrito(carritoActualizado);
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    };

    const handleUpdateQuantity = (platoId, newQuantity) => {
        if (newQuantity < 1) return;
        
        const carritoActualizado = carrito.map(item =>
            item.id === platoId ? { ...item, cantidad: newQuantity } : item
        );
        setCarrito(carritoActualizado);
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </Container>
        );
    }

    return (
        <>
            <Button 
                variant="primary" 
                className="cart-button"
                onClick={() => setShowCart(true)}
            >
                <FaShoppingCart /> 
                <span className="cart-count">{carrito.length}</span>
            </Button>

            <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {carrito.length === 0 ? (
                        <p>No hay productos en el carrito</p>
                    ) : (
                        <>
                            {carrito.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img 
                                        src={item.imagen} 
                                        alt={item.nombre} 
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h5>{item.nombre}</h5>
                                        <p>S/. {item.precio}</p>
                                        <div className="quantity-controls">
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm"
                                                onClick={() => handleUpdateQuantity(item.id, item.cantidad - 1)}
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2">{item.cantidad}</span>
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm"
                                                onClick={() => handleUpdateQuantity(item.id, item.cantidad + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        ×
                                    </Button>
                                </div>
                            ))}
                            <div className="cart-total">
                                <h4>Total: S/. {calcularTotal().toFixed(2)}</h4>
                                <Button variant="success" className="w-100">
                                    Proceder al pago
                                </Button>
                            </div>
                        </>
                    )}
                </Offcanvas.Body>
            </Offcanvas>

            <Container className="carta-container mt-5">
                <h1 className="text-center mb-4">Nuestra Carta</h1>
                <Row>
                    {platos.map(plato => (
                        <Col key={plato.id} xs={12} md={6} lg={3} className="mb-3">
                            <Card className="h-100 shadow-sm">
                                {plato.imagen && (
                                    <Card.Img 
                                        variant="top" 
                                        src={plato.imagen} 
                                        alt={plato.nombre}
                                        className="card-img"
                                    />
                                )}
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{plato.nombre}</Card.Title>
                                    <Card.Text>{plato.descripcion}</Card.Text>
                                    <Card.Text className="precio">S/. {plato.precio}</Card.Text>
                                    <Card.Text className="categoria">
                                        <small className="text-muted">
                                            Categoría: {plato.categoria}
                                        </small>
                                    </Card.Text>
                                    <Button 
                                        variant="primary" 
                                        className="mt-auto"
                                        onClick={() => handleAddToCart(plato)}
                                    >
                                        Añadir al carrito
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Carta;

