import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegation from './components/navegation';
import Inicio from './view/inicio';
import Historia from './view/historia';
import Login from './view/login';
import Crear from './components/crear';
import EditarPedidos from './view/editar_pedidos';
import ListPedidos from './view/list_pedidos';
import FormComponent from './components/form';
import Dashboard from './page/dasboard';
import Carta from './view/carta';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navegation />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<FormComponent />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/login" element={<Login />} />
            <Route path="/carta" element={<Carta />} />
            <Route path="/crear" element={<Crear />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pedidos" element={<ListPedidos />} />
            <Route path="/editarpedidos/:id" element={<EditarPedidos />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
