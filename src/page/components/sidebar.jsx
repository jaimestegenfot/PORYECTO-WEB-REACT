import React from 'react';
import { Nav } from 'react-bootstrap';
import './../scss/sidebar.scss';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = ({ setCurrentPage, currentPage }) => {
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
        localStorage.removeItem('user');
        navigate('/login');
      }
    });
  };

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">¡Hola!</h2>
      <Nav className="flex-column">
        <Nav.Link 
          onClick={() => setCurrentPage('favoritos')}
          className={`sidebar-link ${currentPage === 'favoritos' ? 'active' : ''}`}
        >
          Mis Favoritos
        </Nav.Link>
        <Nav.Link 
          onClick={() => setCurrentPage('historial')}
          className={`sidebar-link ${currentPage === 'historial' ? 'active' : ''}`}
        >
          Historial de pedidos
        </Nav.Link>
        <Nav.Link 
          onClick={() => setCurrentPage('informacion')}
          className={`sidebar-link ${currentPage === 'informacion' ? 'active' : ''}`}
        >
          Mi Información
        </Nav.Link>
        <Nav.Link 
          onClick={() => setCurrentPage('actualizar')}
          className={`sidebar-link ${currentPage === 'actualizar' ? 'active' : ''}`}
        >
          Actualizar Clave
        </Nav.Link>
        <Nav.Link 
          onClick={handleLogout}
          className={`sidebar-link ${currentPage === 'logout' ? 'active' : ''}`}
        >
          Cerrar sesión
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
