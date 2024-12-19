import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/principal.css';
import './../scss/navegation.scss';
import { Link } from 'react-router-dom';
import icon from './../img/icon/icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  return (
    <Navbar expand="lg" fixed="top" className='row container Navbar '>
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
          <Nav className="me-auto Navbar__links">
            <Link to="/" className="nav-link">Formulario</Link>
            <Link to="/inicio" className="nav-link">Inicio</Link>
            <Link to="/historia" className="nav-link">Historia</Link>
            <Link to="/carta" className="nav-link">Carta</Link>
            <Link to="/promociones" className="nav-link">Promociones</Link>
            <Link to="/pedidos" className="nav-link">Pedidos</Link>
            
            <Link to="/login" className="nav-link" id='login'>
              <FontAwesomeIcon icon={faCircleUser} />
            </Link>

            
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
