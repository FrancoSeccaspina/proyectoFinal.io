import { useEffect, useState } from "react"; /*PASA A PRODUCTOS.JSX*/ 
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../css/header.css'

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
  //Botón para eliminar 
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta rutina?")) {
      try {
        await axios.delete(`http://localhost:3032/api/ejercicios/${id}`, { withCredentials: true });
        setEjercicios(prevRutinas => prevRutinas.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error al eliminar rutina:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };
  
  const ejerciciosFiltrados = categoriaSeleccionada === 'Todos'
  ? ejercicios
  : ejercicios.filter(ejercicios => ejercicios.grupo_muscular_id === parseInt(categoriaSeleccionada));

return (
<div className="container-products">
  <section className="moverJuntos">
    <h2 className='box-title'>Lista de Ejercicios:</h2>
    <Link to={`/rutinaNueva`} className="btn btn-primary">
      Agregar Nuevo
    </Link>
  </section>
    <h2 className='box-title'>Lista de Ejercicios: {ejerciciosFiltrados.length}</h2>

  <div className='category-filters'>
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
                            <th>Descripcion</th>
                            <th>Ejecucion</th>
                            <th>Video</th>
                            <th>Acciones</th>
                            
                        </tr>
                </thead>
                <tbody>
                    { ejerciciosFiltrados.map((ejercicios) =>(
                        <tr key={ejercicios.id}>
                            <td>{ejercicios.nombre}</td>
                            <td>
                      <div class="accordion bg-dark text-white" id="accordionExample">
                        <div class="accordion-item bg-dark text-white">
                          <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              Ver Descripcion
                            </button>
                          </h2>
                          <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">{ejercicios.descripcion}</div>
                          </div>
                        </div>
                      </div>
                      </td>
                            <td>{ejercicios.titulo}</td>
                            <td>
                        <a href={ejercicios.video} target="_blank" rel="noopener noreferrer">
                          Ir al video
                         </a>
                            </td>
                            <td>
                               <Link to={`/rutinas/editar/${ejercicios.id}`} className="btn btn-success">Editar</Link>
                              <button class="btn btn-danger" onClick={() => handleDelete(ejercicios.id)}>Eliminar</button>
                            </td>
                        
                        </tr>
                    ))}
                </tbody>
        </table>
</div>
);
}

export default Ejercicios;
