import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navegation';
import FormComponent from './components/form';



function App() {
  return (
    
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<FormComponent />} />
        

      </Routes>
    </Router>
  );
}

export default App
