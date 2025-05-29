
import Productos from './component/Productos';
import Home from './component/Home';
import Usuario from "./component/Usuario";
import Rutinas from "./component/Rutinas";
import Recetas from "./component/Recetas";
import Sidebar from './component/Sidebar';
import CuotaFormulario from './component/CuotaFormulario';
import Proveedores from './component/Proveedores'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EdicionReceta from './ABM/EdicionRece';
import EdicionRutina from './ABM/EdicionRuti';
import EdicionUsuario from './ABM/EdicionUsu';
import EdicionProductos from './ABM/EdicionProd';
import AltaProd from './ABM/AltaProd';
import AltaRuti from './ABM/AltaRuti';
import AltaRece from './ABM/AltaRece';
import EdicionCuota from './ABM/EdicionCuota';

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
        <Route path="/productos/editar/:id" element={<EdicionProductos />} />
         <Route path="/recetas/editar/:id" element={<EdicionReceta />} />
         <Route path="/rutinas/editar/:id" element={<EdicionRutina />} />
         <Route path="/usuarios/editar/:id" element={<EdicionUsuario />} />
         <Route path="/productoNuevo" element={<AltaProd />} />
         <Route path="/rutinaNueva" element={<AltaRuti />} />
         <Route path='/recetaNueva' element={<AltaRece />} />
         <Route path="/cuota/:id" element={<CuotaFormulario />} />
         <Route path="/cuota/editarCuota/:id" element={<EdicionCuota />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
