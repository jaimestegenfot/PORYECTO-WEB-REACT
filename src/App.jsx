import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navegation';
import FormComponent from './components/form';
import Login from './view/login';



function App() {
  return (
    
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App
