import React from 'react';
import { FaBox, FaChartLine, FaUsers, FaClipboardList } from 'react-icons/fa';

const Header = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    return (
        
        <div className="header-container row">
            {/* Header principal */}
            <div className="dashboard-header col-md-12">
                <h1>Panel de Administración</h1>
                <div className="user-info">
                    <span>{userData.nombre || 'Usuario'}</span>

                    <i className="fa-solid fa-circle-user"></i>
                </div>
            </div>

            {/* Tarjetas de estadísticas en fila */}
            <div className="stats-row row">
                <div className="stat-card col-md-2">
                    <div className="stat-icon">
                        <FaBox />
                    </div>
                    <div className="stat-info">
                        <h3>Total Productos</h3>
                        <p>124</p>
                    </div>
                </div>
                <div className="stat-card col-md-2">
                    <div className="stat-icon">
                        <FaChartLine />
                    </div>
                    <div className="stat-info">
                        <h3>Ventas del Mes</h3>
                        <p>$15,890</p>
                    </div>
                </div>
                <div className="stat-card col-md-2">
                    <div className="stat-icon">
                        <FaUsers />
                    </div>
                    <div className="stat-info">
                        <h3>Clientes</h3>
                        <p>122</p>
                    </div>
                </div>
                <div className="stat-card col-md-2">
                    <div className="stat-icon">
                        <FaClipboardList />
                    </div>
                    <div className="stat-info">
                        <h3>Pedidos Pendientes</h3>
                        <p>18</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;