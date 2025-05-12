import { useEffect, useState } from "react"; /*PASA A PRODUCTOS.JSX*/ 
import { useLocation } from 'react-router-dom';

function Ejercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoriaDesdeURL = query.get("categoria") || "Todos";
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const getCategorias = async ()=> {
  const response = await fetch("http://localhost:3032/api/categoriaGrupoMuscular");
  const data = await response.json();
  console.log('DATA RECIBIDA:', data);
  setCategoria(data);
  }
  const getEjercicios = async ()=> {
    const response = await fetch("http://localhost:3032/api/ejercicios");
    const data = await response.json();
    console.log('DATA RECIBIDA:', data);
    setEjercicios(data);
  }
    // Sincronizar con la URL cuando cambia
    useEffect(() => {
      setCategoriaSeleccionada(categoriaDesdeURL);
    }, [categoriaDesdeURL]);

  useEffect(() => {
    getEjercicios();
    getCategorias();
  }, [])


  const ejerciciosFiltrados = categoriaSeleccionada === 'Todos'
  ? ejercicios
  : ejercicios.filter(ejercicios => ejercicios.grupo_muscular_id === parseInt(categoriaSeleccionada));

return (
<div className="container-products">
  <h2 className='box-title'>Lista de Ejercicios: {ejerciciosFiltrados.length}</h2>

  <div className='category-filter'>
  <label>Filtrar por categoría: </label><br/>
          <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
              <option value="Todos">Todos</option>
              {categorias.map(cat => (
                  <option key={cat.grupo_muscular_id} value={cat.id}>{cat.nombre}</option>
              ))}
          </select>

  </div>
      <table className='table table-dark table-striped'>
                <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Se hace con:</th>
                        </tr>
                </thead>
                <tbody>
                    { ejerciciosFiltrados.map((ejercicios) =>(
                        <tr key={ejercicios.id}>
                            <td>{ejercicios.nombre}</td>
                            <td>{ejercicios.titulo}</td>
                        </tr>
                    ))}
                </tbody>
        </table>
</div>
);
}

export default Ejercicios;
