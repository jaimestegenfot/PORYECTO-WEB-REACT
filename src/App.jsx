import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navegation';
import FormComponent from './components/form';
import Login from './view/login';
import Home from './view/inicio';
import Carta from './view/carta';
import Promociones from './view/promociones';

import Historia from './view/historia';
import Crear from './components/crear';
import ListPedidos from './view/list_pedidos';
import EditarPedidos from './view/editar_pedidos';

function App() {
  return (
    
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/promociones" element={<Promociones />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/pedidos" element={<ListPedidos />} />
        <Route path="/editarpedidos/:id" element={<EditarPedidos />} />
        

      </Routes>
    </Router>
  );
}

export default App
