import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../config/firebase";
//import { db } from '../config/firebase';
import Swal from "sweetalert2";
import './../scss/login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.rol) {
      // Redirigir según el rol
      if (user.rol === "admin") {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const usuariosRef = collection(db, 'usuarios');
      const q = query(
        usuariosRef, 
        where("gmail", "==", email),
        where("password", "==", password)
      );
      
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Swal.fire("Error", "Correo o contraseña incorrectos", "error");
        return;
      }

      // Usuario encontrado
      const userData = querySnapshot.docs[0].data();
      
      if (userData.estado !== "activo") {
        Swal.fire("Error", "Esta cuenta está desactivada", "error");
        return;
      }

      // Login exitoso
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: `Hola ${userData.nombre}`,
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        localStorage.setItem('user', JSON.stringify(userData));
        // Redirigir según el rol después del login
        if (userData.rol === "admin") {
          navigate('/dashboard');
        } else {
          navigate('/home');
        }
      });

    } catch (error) {
      console.error("Error:", error);
      setError('Error al iniciar sesión: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="container d-flex align-items-center justify-content-center login-container">
      <Card className="login-card col-12 col-md-5 col-lg-5 col-xl-5">
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button 
              className="w-100 mb-3" 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>

            <Link to="/crear" className='w-100 btn btn-danger'>
              Crear Cuenta
            </Link>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
