import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import './../scss/login.scss';
import { Link } from 'react-router-dom';

const Crear = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!email || !password || !nombre) {
      setError('Por favor, complete todos los campos');
      return;   
    }
    console.log('Creando cuenta con:', nombre, email, password); 
  };

  return (
    <Container className="d-flex align-items-center justify-content-center login-container">
      <Card className="login-card">
        <Card.Body>
          <h2 className="text-center mb-4"> Crear Cuenta </h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>
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
              Crear Cuenta
            </Button>
            
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Crear;