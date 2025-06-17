import Productos from './component/Productos';
import Home from './component/Home';
import Usuario from "./component/Usuario";
import Rutinas from "./component/Rutinas";
import Recetas from "./component/Recetas";
import Sidebar from './component/Sidebar';
import CuotaFormulario from './component/CuotaFormulario';
import Proveedores from './component/Proveedores';
import Reservas from './component/Reservas';
import PrecioCuota from './component/PrecioCuota';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import EdicionReceta from './ABM/EdicionRece';
import EdicionRutina from './ABM/EdicionRuti';
import EdicionUsuario from './ABM/EdicionUsu';
import EdicionProductos from './ABM/EdicionProd';
import EdicionProveedor from './ABM/EdicionProveedor';

import AltaProd from './ABM/AltaProd';
import AltaRuti from './ABM/AltaRuti';
import AltaRece from './ABM/AltaRece';
import EdicionCuota from './ABM/EdicionCuota';
import AltaCuota from './ABM/AltaCuota';
import AltaProveedor from './ABM/AltaProveedor';
import AltaPrecioCuota from './ABM/AltaPrecioCuota';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Usuarios" element={<Usuario />} />
          <Route path="/Rutinas" element={<Rutinas />} />
          <Route path="/Recetas" element={<Recetas />} />
          <Route path="/Proveedores" element={<Proveedores />} />
          <Route path="/Reservas" element={<Reservas />} />
          <Route path="/PrecioCuota" element={<PrecioCuota />} />
          
          {/* Ediciones */}
          <Route path="/productos/editar/:id" element={<EdicionProductos />} />
          <Route path="/recetas/editar/:id" element={<EdicionReceta />} />
          <Route path="/rutinas/editar/:id" element={<EdicionRutina />} />
          <Route path="/usuarios/editar/:id" element={<EdicionUsuario />} />
          <Route path="/cuota/editar/:id" element={<EdicionCuota />} />
          <Route path="/provedores/editar/:id" element={<EdicionProveedor />} />

          {/* Altas */}
          <Route path="/productoNuevo" element={<AltaProd />} />
          <Route path="/rutinaNueva" element={<AltaRuti />} />
          <Route path="/recetaNueva" element={<AltaRece />} />
          <Route path="/cuotaNueva/:idUsuario" element={<AltaCuota />} />
          <Route path="/proveedorNuevo" element={<AltaProveedor />} />
          <Route path="/nuevoPrecioCuota" element={<AltaPrecioCuota />} />

          {/* Otros */}
          <Route path="/cuota/:id" element={<CuotaFormulario />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
