import React from 'react';
import { FaBox, FaChartLine, FaUsers, FaClipboardList } from 'react-icons/fa';
import '../scss/dashboard.scss';

const Dashboard = () => {
    return (
        <div className="dashboard-container mt-5">
            {/* Header */}
            <div className="dashboard-header">
                <h1>Panel de Administración</h1>
                <div className="user-info">
                    <span>Admin</span>
                    <i className="fa-solid fa-circle-user"></i>
                </div>
            </div>

            {/* Tarjetas de estadísticas */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaBox />
                    </div>
                    <div className="stat-info">
                        <h3>Total Productos</h3>
                        <p>124</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaChartLine />
                    </div>
                    <div className="stat-info">
                        <h3>Ventas del Mes</h3>
                        <p>$15,890</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaUsers />
                    </div>
                    <div className="stat-info">
                        <h3>Clientes</h3>
                        <p>1,245</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaClipboardList />
                    </div>
                    <div className="stat-info">
                        <h3>Pedidos Pendientes</h3>
                        <p>18</p>
                    </div>
                </div>
            </div>

            {/* Tabla de productos */}
            <div className="products-section">
                <div className="section-header">
                    <h2>Gestión de Productos</h2>
                    <button className="btn-add">Añadir Producto</button>
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
                            <tr>
                                <td><img src="/producto1.jpg" alt="Producto" className="product-img" /></td>
                                <td>Hamburguesa Clásica</td>
                                <td>Hamburguesas</td>
                                <td>$12.99</td>
                                <td>50</td>
                                <td>
                                    <button className="btn-edit">Editar</button>
                                    <button className="btn-delete">Eliminar</button>
                                </td>
                            </tr>
                            {/* Más filas aquí */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
