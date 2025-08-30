import { useEffect, useState } from "react"; /*PASA A PRODUCTOS.JSX*/ 
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/header.css'

function Recetas() {
  console.log('Se está renderizando <Productos />');
  const [recetas, setRecetas] = useState([]);
  const [categoriasReceta, setCategoriaReceta] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCategorias = async ()=> {
    const response = await fetch(`http://${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/categoriaRecetas`);
    const data = await response.json();
    console.log('DATA RECIBIDA:', data);
    setCategoriaReceta(data);
  }
  const getRecetas = async ()=> {
    const response = await fetch(`http://${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/recetas`);
    const data = await response.json();
    console.log('DATA RECIBIDA:', data);
    setRecetas(data);
  }

  useEffect(() => {
    getRecetas();
    getCategorias();
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta rutina?")) {
      try {
        await axios.delete(`http://${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/recetas/${id}`, { withCredentials: true });
        setRecetas(prevRecetas => prevRecetas.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error al eliminar recetas:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const categoriasMap = categoriasReceta.reduce((acc, c) => {
    acc[String(c.id)] = c.nombre;
    return acc;
  }, {});

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const recetasFiltradas = recetas.filter(recetas => {
    if (!normalizedSearch) return true;
    const nombre = String(recetas.nombre || "").toLowerCase();
    const categoriaNombre = String(categoriasMap[String(recetas.categoriaId)] || "").toLowerCase();
    return nombre.includes(normalizedSearch) || categoriaNombre.includes(normalizedSearch);
  });
      return (
        <div className="container-products">
        <section className="moverJuntos">
          <h2 className='box-title'>Catálogo de recetas</h2>
          <h3 className='box-title'>Recetas registradas  : {recetasFiltradas.length}</h3>

          <Link to={`/recetaNueva`} class="btn btn-primary" >Agregar Nuevo</Link>
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
                      <td><img src={`http://${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/images/${recetas.imagen}`} alt="" width='150' className='game-image' /></td>
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
