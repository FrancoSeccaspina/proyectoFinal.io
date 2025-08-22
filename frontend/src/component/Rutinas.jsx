import { useEffect, useState } from "react"; /*PASA A PRODUCTOS.JSX*/ 
import { Link } from "react-router-dom";
import axios from 'axios';
import '../css/header.css'

function Ejercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  
  const categoriasMap = categorias.reduce((acc, c) => {
    acc[String(c.id)] = c.nombre;
    return acc;
  }, {});

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const ejerciciosFiltrados = ejercicios.filter(ejercicios => {
    if (!normalizedSearch) return true;
    const nombre = String(ejercicios.nombre || "").toLowerCase();
    const categoriaNombre = String(categoriasMap[String(ejercicios.grupo_muscular_id)] || "").toLowerCase();
    return nombre.includes(normalizedSearch) || categoriaNombre.includes(normalizedSearch);
  });

return (
<div className="container-products">
  <section className="moverJuntos">
    <h2 className='box-title'>Catálogo de  Ejercicios:</h2>
    <h3 className='box-title'>Ejercicios registrados: {ejerciciosFiltrados.length}</h3>

    <Link to={`/rutinaNueva`} className="btn btn-primary">
      Agregar Nuevo
    </Link>
  </section>
 
  <div className='category-filters'>
            <input
                type="text"
                placeholder="Buscar por nombre o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mt-2 mb-3"
              />

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
