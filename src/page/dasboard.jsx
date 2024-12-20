import React from 'react';
import { Container, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './layouts/header';
import Body from './layouts/body';
import Swal from 'sweetalert2';
import './scss/dashboard.scss';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¿Deseas cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Limpiar el localStorage o sessionStorage
                localStorage.removeItem('user');
                // También puedes limpiar otros datos de sesión si los tienes
                
                Swal.fire(
                    '¡Sesión cerrada!',
                    'Has cerrado sesión exitosamente.',
                    'success'
                ).then(() => {
                    // Redirigir al login
                    navigate('/login');
                });
            }
        });
    };

    return (
        <Container fluid className="dashboard-container container">
            <div className="logout-button-container mb-5">
                <Button 
                    variant="danger" 
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <i className="fa-solid fa-right-from-bracket"></i>
                </Button>
            </div>
            
            <Col md={12}>
                <Header />
            </Col>
            <Col md={12}>
                <Body />
            </Col>
        </Container>
    );
};

export default Dashboard;
