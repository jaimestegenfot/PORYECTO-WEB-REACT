import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/Navigation.css';
import { Link } from 'react-router-dom';
import icon from'./../img/icon/icon.png';
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
            <Link to="/" className="nav-link">Formulario</Link>
            <Link to="/newProduct" className="nav-link">menu</Link>
            <Link to="/login" className="nav-link">
              <FontAwesomeIcon icon={faCircleUser} />
            </Link>
            <Link to="/newProduct" className="nav-link">menu</Link>
            <Link to="/newProduct" className="nav-link">menu</Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
