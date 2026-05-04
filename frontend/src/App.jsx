import Productos from './component/Productos';
import Home from './component/Home';
import Usuario from "./component/Usuario";
import Rutinas from "./component/Rutinas";
import Recetas from "./component/Recetas";
import Sidebar from './component/Sidebar';
import CuotaFormulario from './component/CuotaFormulario';
import Proveedores from './component/Proveedores';
import Reservas from './component/Reservas';
import ReservaPorId from './component/ReservaPorId'
import PrecioCuota from './component/PrecioCuota';
import Empleados from './component/Empleados';
import Actividad from './component/Actividad';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import EdicionReceta from './ABM/EdicionRece';
import EdicionRutina from './ABM/EdicionRuti';
import EdicionUsuario from './ABM/EdicionUsu';
import EdicionProductos from './ABM/EdicionProd';
import EdicionProveedor from './ABM/EdicionProveedor';
import EdicionEmpleado from './ABM/EdicionEmpleado';

import AltaProd from './ABM/AltaProd';
import AltaRuti from './ABM/AltaRuti';
import AltaRece from './ABM/AltaRece';
import EdicionCuota from './ABM/EdicionCuota';
import AltaCuota from './ABM/AltaCuota';
import AltaProveedor from './ABM/AltaProveedor';
import AltaPrecioCuota from './ABM/AltaPrecioCuota';
import AltaEmpleado from './ABM/AltaEmpleado';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/usuarios" element={<Usuario />} />
          <Route path="/rutinas" element={<Rutinas />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/reservas/:id" element={<ReservaPorId />} />
          <Route path="/precios-cuota" element={<PrecioCuota />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/actividades" element={<Actividad />} />

          {/* Ediciones */}
          <Route path="/productos/editar/:id" element={<EdicionProductos />} />
          <Route path="/recetas/editar/:id" element={<EdicionReceta />} />
          <Route path="/rutinas/editar/:id" element={<EdicionRutina />} />
          <Route path="/usuarios/editar/:id" element={<EdicionUsuario />} />
          <Route path="/cuotas/editar/:id" element={<EdicionCuota />} />
          <Route path="/proveedores/editar/:id" element={<EdicionProveedor />} />
          <Route path="/empleados/editar/:id" element={<EdicionEmpleado />} />

          {/* Altas */}
          <Route path="/productos/nuevo" element={<AltaProd />} />
          <Route path="/rutinas/nueva" element={<AltaRuti />} />
          <Route path="/recetas/nueva" element={<AltaRece />} />
          <Route path="/cuotas/nueva/:idUsuario" element={<AltaCuota />} />
          <Route path="/proveedores/nuevo" element={<AltaProveedor />} />
          <Route path="/empleados/nuevo" element={<AltaEmpleado />} />
          <Route path="/precios-cuota/nuevo" element={<AltaPrecioCuota />} />

          {/* Otros */}
          <Route path="/cuotas/:id" element={<CuotaFormulario />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
