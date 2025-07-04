import { useEffect, useState } from "react"; /*PASA A PRODUCTOS.JSX*/ 
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/header.css'

function Recetas() {
  console.log('Se está renderizando <Productos />');
  const [recetas, setRecetas] = useState([]);
  const [categoriasReceta, setCategoriaReceta] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoriaDesdeURL = query.get("categoria") || "Todos";
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const getCategorias = async ()=> {
    const response = await fetch("http://localhost:3032/api/categoriaRecetas");
    const data = await response.json();
    console.log('DATA RECIBIDA:', data);
    setCategoriaReceta(data);
  }
  const getRecetas = async ()=> {
    const response = await fetch("http://localhost:3032/api/recetas");
    const data = await response.json();
    console.log('DATA RECIBIDA:', data);
    setRecetas(data);
  }
    // Sincronizar con la URL cuando cambia
    useEffect(() => {
      setCategoriaSeleccionada(categoriaDesdeURL);
    }, [categoriaDesdeURL]);

  useEffect(() => {
    getRecetas();
    getCategorias();
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta rutina?")) {
      try {
        await axios.delete(`http://localhost:3032/api/recetas/${id}`, { withCredentials: true });
        setRecetas(prevRecetas => prevRecetas.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error al eliminar recetas:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const recetasFiltradas = categoriaSeleccionada === 'Todos'
      ? recetas
      : recetas.filter(recetas => recetas.categoriaId === parseInt(categoriaSeleccionada));
    
      return (
        <div className="container-products">
        <section className="moverJuntos">
          <h2 className='box-title'>Lista de Receta</h2>
          <Link to={`/recetaNueva`} class="btn btn-primary" >Agregar Nuevo</Link>
        </section>
          <h3 className='box-title'>Lista de Recetas  : {recetasFiltradas.length}</h3>

          
          <div className='category-filters'>
          <label>Filtrar por categoría: </label><br/>
                  <select
                      value={categoriaSeleccionada}
                      onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                  >
                      <option value="Todos">Todos</option>
                      {categoriasReceta.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                      ))}
                  </select>
    
          </div>
    
          <ul className='list-container'>
          <table className='table table-dark table-striped'>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                    {recetasFiltradas.map((recetas) => (
                  <tr key= {recetas.id}>
                      <td>{recetas.nombre}</td>
                      <td><img src={`http://localhost:3032/images/${recetas.imagen}`} alt="" width='150' className='game-image' /></td>
                      <td>
                      <div class="accordion bg-dark text-white" id="accordionExample">
                        <div class="accordion-item bg-dark text-white">
                          <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              Ver Descripcion
                            </button>
                          </h2>
                          <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">{recetas.descripcion}</div>
                          </div>
                        </div>
                      </div>
                      </td>
                      <td>  
                        <Link to={`/recetas/editar/${recetas.id}`} className="btn btn-success">Editar</Link>
                        <button class="btn btn-danger" onClick={() => handleDelete(recetas.id)}>Eliminar</button>
                      </td>
                        
                      </tr>
                  ))}
                    </tbody>
                  </table>
              </ul>
        </div>
      );
    }

export default Recetas;
