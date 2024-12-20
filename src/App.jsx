import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegation from './components/navegation';
import Inicio from './view/inicio';
import Historia from './view/historia';
import Login from './view/login';
import Crear from './components/crear';
import Dashboard from './view/dashboard';
import Carta from './view/carta';
import EditarPedidos from './view/editar_pedidos';
import ListPedidos from './view/list_pedidos';
import FormComponent from './components/form';

function App() {
  return (
    <Router>
      <Navegation />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/listapedidos" element={<ListPedidos />} />
        <Route path="/editarpedidos/:id" element={<EditarPedidos />} />
        <Route path="/form" element={<FormComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
