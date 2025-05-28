import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom'; /*PASA A PRODUCTOS.JSX*/ 
function Productos() {
  console.log('Se está renderizando <Productos />');
  const [products, setProducts] = useState([]);
  const [categorias, setCategoria] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoriaDesdeURL = query.get("categoria") || "Todos";
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const getCategorias = async ()=> {
    const response = await fetch("http://localhost:3032/api/categoriaProductos");
    const data = await response.json();
    console.log('DATA RECIBIDA:', data);
    setCategoria(data);
  }
  const getProducts = async ()=> {
    const response = await fetch("http://localhost:3032/api/productos");
    const data = await response.json();
    console.log('DATA RECIBIDA:', data);
    setProducts(data);
  }
  // Sincronizar con la URL cuando cambia
  useEffect(() => {
    setCategoriaSeleccionada(categoriaDesdeURL);
  }, [categoriaDesdeURL]);

  useEffect(() => {
    getProducts();
    getCategorias();
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta producto?")) {
      try {
        await axios.delete(`http://localhost:3032/api/productos/${id}`);
        setProducts(prevProductos => prevProductos.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const productosFiltrados = categoriaSeleccionada === 'Todos'
      ? products
      : products.filter(products => products.categoriaId === parseInt(categoriaSeleccionada));
    
  return (
    <div className="container-products">
      <h2 className='box-title'>Lista de Productos: {productosFiltrados.length}</h2>
      <Link to={`/productoNuevo`} className="btn btn-primary">
                          Agregar Nuevo
                        </Link>
      <div className='category-filter'>
      <label>Filtrar por categoría: </label><br/>
              <select
                  value= { categoriaSeleccionada }
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                  <option value="Todos">Todos</option>
                  {categorias.map(cat => (
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
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                    {productosFiltrados.map((products) => (
                  <tr key= {products.id}>
                      <td>{products.nombre}</td>
                      <td><img src={`http://localhost:3032/images/${products.imagen}`} alt="" width='150' className='game-image' /></td>
                      <td>{products.stock}</td>
                      <td>$ {products.precio}</td>
                      <td>
                        <Link to={`/productos/editar/${products.id}`} className="btn btn-success">
                          Editar
                        </Link>
                              <button class="btn btn-danger" onClick={() => handleDelete(products.id)}>Eliminar</button>
                      </td>
                        
                      </tr>
                  ))}
                    </tbody>
                  </table>
          </ul>
    </div>
  );
}

export default Productos;
