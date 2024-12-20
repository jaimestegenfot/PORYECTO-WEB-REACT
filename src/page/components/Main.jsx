import React from 'react';
import { Container } from 'react-bootstrap';
import './../scss/main.scss';

const MainContent = ({ currentPage }) => {
  const renderContent = () => {
    switch(currentPage) {
      case 'favoritos':
        return (
          <>
            <h1>Mis Favoritos</h1>
            <p>Aquí encontrarás tus productos favoritos.</p>
          </>
        );
      case 'historial':
        return (
          <>
            <h1>Historial de Pedidos</h1>
            <p>Revisa todos tus pedidos anteriores.</p>
          </>
        );
      case 'informacion':
        return (
          <>
            <h1>Mi Información</h1>
            <p>Gestiona tu información personal.</p>
          </>
        );
      case 'actualizar':
        return (
          <>
            <h1>Actualizar Clave</h1>
            <p>Cambia tu contraseña aquí.</p>
          </>
        );
      case 'logout':
        return (
          <>
            <h1>Cerrar Sesión</h1>
            <p>¿Estás seguro que deseas salir?</p>
          </>
        );
      default:
        return (
          <>
            <h1 className="welcome-title">Bienvenido</h1>
            <p className="welcome-text">
              Selecciona una opción de la barra lateral para ver más detalles.
            </p>
          </>
        );
    }
  };

  return (
    <Container className="main-content">
      {renderContent()}
    </Container>
  );
};

export default MainContent;
