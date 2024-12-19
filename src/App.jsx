import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navegation';
import FormComponent from './components/form';
import Login from './view/login';
import Home from './view/inicio';
import Carta from './view/carta';
import Promociones from './view/promociones';
import ListPedidos from './components/list_pedidos';
import Historia from './view/historia';



function App() {
  return (
    
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pedidos" element={<ListPedidos />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/promociones" element={<Promociones />} />

      </Routes>
    </Router>
  );
}

export default App
