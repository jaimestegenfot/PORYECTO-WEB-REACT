import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de autenticación
    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }
    // Aquí puedes agregar la lógica de autenticación
    console.log('Intentando iniciar sesión con:', email, password);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center login-container">
      <Card className="login-card">
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
                required
              />
            </Form.Group>

            <Button className="w-100 mb-3" variant="primary" type="submit">
              Iniciar Sesión
            </Button>

            <Button className="w-100" variant="danger">
              Iniciar Sesión con Google
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
