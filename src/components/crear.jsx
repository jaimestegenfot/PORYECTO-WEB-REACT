import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
//import { db } from "../config/firebase";
import Swal from "sweetalert2";

import { useNavigate } from 'react-router-dom';


import './../scss/login.scss';

const Crear = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("gmail", "==", email));
      const snapshot = await getDocs(q);
  
      if (!snapshot.empty) {
        Swal.fire("¡Error!", "Este correo ya está registrado. Intenta con otro.", "error");
        return;
      }
  
      await addDoc(usuariosRef, {
        nombre,
        gmail: email,
        password,
        estado: "activo",
        rol: "usuario",
      });
      
      Swal.fire({
        title: "Creando usuario...",
        text: "Espera un momento.",
        allowOutsideClick: false, // No permitir cerrar haciendo clic afuera
        didOpen: () => {
          Swal.showLoading(); // Mostrar animación de carga
        },
        timer: 3000, // 3 segundos
      }).then(() => {
        Swal.fire("¡Usuario creado exitosamente!", "Ahora puedes iniciar sesión.", "success")
          .then(() => {
            navigate('/login'); // Redirigir después de la segunda alerta
          });
      });

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center login-container">
      <Card className="login-card col-md-4 col-sm-12 col-xs-12">
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
                autoComplete="email"
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
                autoComplete="new-password"
              />
            </Form.Group>

            <Button className="w-100 mb-3" variant="primary" type="submit" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </Button>

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Crear;