
import Productos from './component/Productos';
import Home from './component/Home';
import Usuario from "./component/Usuario";
import Rutinas from "./component/Rutinas";
import Recetas from "./component/Recetas";
import Sidebar from './component/Sidebar';
import Proveedores from './component/Proveedores'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(){
  return (
    <div>
      <BrowserRouter>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Usuarios" element={<Usuario />} />
        <Route path="/Rutinas" element={<Rutinas />} />
        <Route path="/Recetas" element={<Recetas />} />
        <Route path="/Proveedores" element={<Proveedores />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
