import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../css/header.css'
import '../css/productos.css'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Productos() {
  console.log('Se está renderizando <Productos /> ');
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCategorias = async ()=> {
    try {
      const response = await fetch("http://localhost:3032/api/categoriaProductos");
      const data = await response.json();
      setCategorias(data);
    } catch (err) {
      console.error('Error al traer categorías:', err);
    }
  }

  const getProducts = async ()=> {
    try {
      const response = await fetch("http://localhost:3032/api/productos", { credentials: 'include' });
      const data = await response.json();
      console.log('DATA RECIBIDA (productos):', data);
      setProducts(data);
      // 🚨 Notificación de stock bajo
      data.forEach(prod => {
        if (prod.stock <= 5) {
          toast.warning(`⚠️ El producto "${prod.nombre}" tiene stock bajo (${prod.stock})`);
        }
        if(prod.stock === 0) {
          toast.error(`❌ El producto "${prod.nombre}" está agotado`);
        }
      });
    } catch (err) {
      console.error('Error al traer productos:', err);
    }
  }

  useEffect(() => {
    getProducts();
    getCategorias();
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta producto?")) {
      try {
        await axios.delete(`http://localhost:3032/api/productos/${id}`, { withCredentials: true });
        setProducts(prevProductos => prevProductos.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };
  const categoriasMap = categorias.reduce((acc, c) => {
    acc[String(c.id)] = c.nombre;
    return acc;
  }, {});

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const productosFiltrados = products.filter(product => {
    if (!normalizedSearch) return true;
    const nombre = String(product.nombre || "").toLowerCase();
    const categoriaNombre = String(categoriasMap[String(product.categoriaId)] || "").toLowerCase();
    return nombre.includes(normalizedSearch) || categoriaNombre.includes(normalizedSearch);
  });

  return (
    <div className="container-products">
      <section className="moverJuntos">
      <h2 className='box-title'>Catálogo de Productos</h2>
        <h3 className='box-title'>Productos registrados: {productosFiltrados.length}</h3>
        <Link to="/productoNuevo" className="btn btn-primary">
          Agregar Nuevo
        </Link>
      </section>
      <div className='category-filters' style={{ marginBottom: 16 }}>
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
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.nombre}</td>
                <td>{categoriasMap[String(prod.categoriaId)] || "Sin categoría"}</td>
                <td>
                  <img
                    src={`http://localhost:3032/images/${prod.imagen}`}
                    alt={prod.nombre}
                    width='150'
                    className='game-image'
                  />
                </td>
                <td>{prod.stock}</td>
                <td>$ {prod.precio}</td>
                <td>
                  <Link to={`/productos/editar/${prod.id}`} className="btn btn-success" style={{ marginRight: 8 }}>
                    Editar
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(prod.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
}

export default Productos;