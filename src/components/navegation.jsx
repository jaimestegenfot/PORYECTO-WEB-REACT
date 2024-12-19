import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/Navigation.css';
import './../css/principal.css';
import { Link } from 'react-router-dom';
import icon from './../img/icon/icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>
          <img
            className="Navbar__icono"
            src={icon}
            alt="Icono"
            width="30"
            height="30"

          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">FORMULARIO</Link>
            <Link to="/inicio" className="nav-link">INICO</Link>
            <Link to="/historia" className="nav-link">HISTORIA</Link>
            <Link to="/carta" className="nav-link">CARTA</Link>
            <Link to="/promociones" className="nav-link">PROMOCIONES</Link>
            <Link to="/pedidos" className="nav-link">PEDIDOS</Link>
            <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon={faCircleUser} />
            </Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
