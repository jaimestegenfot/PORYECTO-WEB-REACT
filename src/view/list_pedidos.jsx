import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProductos } from "../services/productos"
import ProductsTable from "../components/table";
import Swal from 'sweetalert2';
import '../scss/listpedidos.scss';

const ListView = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await getProductos();
                setProductos(data);
            } catch (error) {
                console.error('Error al cargar los pedidos:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudieron cargar los pedidos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2  id="lista" className="text-center mb-4">Lista de Pedidos</h2>
            <div className="table-responsive">
                <ProductsTable 
                    productos={productos} 
                    setProductos={setProductos}
                />
            </div>
        </div>
    );
};

export default ListView
