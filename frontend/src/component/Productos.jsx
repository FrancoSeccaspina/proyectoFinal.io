import { useEffect, useState } from "react";
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

  const productosFiltrados = categoriaSeleccionada === 'Todos'
      ? products
      : products.filter(products => products.categoriaId === parseInt(categoriaSeleccionada));
    
  return (
    <div className="container-products">
      <h2 className='box-title'>Lista de Productos: {productosFiltrados.length}</h2>

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
              {productosFiltrados.map((products) => (
                  <li className='list-products' key= {products.id}>
                      <h3 className='title-products'>{products.nombre}</h3>
                      <section className="game-image">
                      <img src={`http://localhost:3032/images/${products.imagen}`} alt="" width='150' className='game-image' />
                      </section>
                  </li>
              ))}
          </ul>
    </div>
  );
}

export default Productos;
