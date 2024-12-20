import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { Link } from 'react-router-dom';
//import { db, storage } from '../../config/firebase';
//import { storage, uploadFile } from '../../config/firebase';


import Swal from 'sweetalert2';


const Body = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [producto, setProducto] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        imagen: ''
    });
    const [imageUpload, setImageUpload] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // Función para editar producto
    const handleEdit = (producto) => {
        setIsEditing(true);
        setSelectedProductId(producto.id);
        setProducto({
            nombre: producto.nombre,
            categoria: producto.categoria,
            precio: producto.precio.toString(),
            stock: producto.stock.toString(),
            imagen: producto.imagen
        });
        setPreviewImage(producto.imagen);
        setShowModal(true);
    };

    // Función para eliminar producto
    const handleDelete = (productoId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const productoRef = doc(db, 'productos', productoId);
                    await deleteDoc(productoRef);
                    await cargarProductos(); // Recargar la lista
                    
                    Swal.fire(
                        '¡Eliminado!',
                        'El producto ha sido eliminado.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al eliminar:", error);
                    Swal.fire(
                        'Error',
                        'No se pudo eliminar el producto',
                        'error'
                    );
                }
            }
        });
    };

    // Modificar handleSubmit para manejar tanto creación como edición
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = producto.imagen;
            
            // Subir nueva imagen si se seleccionó una
            if (imageUpload) {
                const imageRef = ref(storage, `productos/${imageUpload.name + Date.now()}`);
                await uploadBytes(imageRef, imageUpload);
                imageUrl = await getDownloadURL(imageRef);
            }

            if (isEditing) {
                // Actualizar producto existente
                const productoRef = doc(db, 'productos', selectedProductId);
                await updateDoc(productoRef, {
                    nombre: producto.nombre,
                    categoria: producto.categoria,
                    precio: parseFloat(producto.precio),
                    stock: parseInt(producto.stock),
                    imagen: imageUrl,
                    fechaActualizacion: new Date()
                });

                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Producto actualizado correctamente'
                });
            } else {
                // Crear nuevo producto
                await addDoc(collection(db, 'productos'), {
                    nombre: producto.nombre,
                    categoria: producto.categoria,
                    precio: parseFloat(producto.precio),
                    stock: parseInt(producto.stock),
                    imagen: imageUrl,
                    fechaCreacion: new Date()
                });

                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Producto agregado correctamente'
                });
            }

            // Limpiar formulario y recargar productos
            handleClose();
            await cargarProductos();

        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: isEditing ? 
                    'No se pudo actualizar el producto' : 
                    'No se pudo agregar el producto'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setIsEditing(false);
        setSelectedProductId(null);
        setProducto({
            nombre: '',
            categoria: '',
            precio: '',
            stock: '',
            imagen: ''
        });
        setImageUpload(null);
        setPreviewImage(null);
    };

    const handleShow = () => setShowModal(true);

    const lista_pedidos = () => {
        navigate('/pedidos');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUpload(file);
            // Crear preview de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Función para cargar productos
    const cargarProductos = async () => {
        try {
            const productosRef = collection(db, 'productos');
            const querySnapshot = await getDocs(productosRef);
            const productosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductos(productosData);
        } catch (error) {
            console.error("Error al cargar productos:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los productos'
            });
        } finally {
            setLoading(false);
        }
    };
    

    // Cargar productos al montar el componente
    useEffect(() => {
        cargarProductos();
    }, []);

    return (
        <>
            <div className="dashboard-container mt-5">
                <div className="products-section">
                    <div className="section-header">
                        <h2>Gestión de Productos</h2>
                        <button className="btn-add" onClick={lista_pedidos}>
                            ver pedidos
                        </button>
                        <button className="btn-add" onClick={handleShow}>
                            Añadir Producto
                        </button>
                    </div>
                    <div className="table-responsive">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            Cargando productos...
                                        </td>
                                    </tr>
                                ) : productos.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            No hay productos registrados
                                        </td>
                                    </tr>
                                ) : (
                                    productos.map(producto => (
                                        <tr key={producto.id}>
                                            <td>
                                                <img 
                                                    src={producto.imagen || '/placeholder.jpg'} 
                                                    alt={producto.nombre}
                                                    className="product-img"
                                                    onError={(e) => {
                                                        e.target.src = '/placeholder.jpg';
                                                    }}
                                                />
                                            </td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.categoria}</td>
                                            <td>${producto.precio.toFixed(2)}</td>
                                            <td>{producto.stock}</td>
                                            <td>
                                                <button 
                                                    className="btn-edit"
                                                    onClick={() => handleEdit(producto)}
                                                >
                                                    Editar
                                                </button>
                                                <button 
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(producto.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal para agregar/editar producto */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={producto.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select
                                name="categoria"
                                value={producto.categoria}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione una categoría</option>
                                <option value="Hamburguesas">Hamburguesas</option>
                                <option value="Bebidas">Bebidas</option>
                                <option value="Postres">Postres</option>
                                <option value="Complementos">Complementos</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                value={producto.precio}
                                onChange={handleChange}
                                required
                                step="0.01"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={producto.stock}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Imagen del Producto</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                            {previewImage && (
                                <div className="mt-2 text-center">
                                    <img 
                                        src={previewImage} 
                                        alt="Preview" 
                                        style={{
                                            maxWidth: '200px',
                                            maxHeight: '200px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                            )}
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={loading}
                            >
                                {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Body;