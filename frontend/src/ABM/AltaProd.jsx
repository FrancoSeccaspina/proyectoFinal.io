import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css';

const AltaProd = () => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoriaId: '',
    stock: ''
  });
  const [categorias, setCategorias] = useState([]);
  // Cargar las categorias al montar el componente
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get('http://localhost:3032/api/categoriaProductos');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener Categoria de Productos:', error);
      }
    };
    fetchGrupos();
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto(prev => ({
          ...prev,
          [name]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(producto)
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('descripcion', producto.descripcion);
        formData.append('precio', producto.precio);
        formData.append('categoriaId', producto.categoriaId);
        formData.append('stock', producto.stock);
        formData.append('imagen', producto.imagen);
      
        try {
          await axios.post('http://localhost:3032/api/productos', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          navigate('/Productos');
        } catch (error) {
          console.error('Error al crear producto:', error);
        }
      };
      

  return (
    <div className='contenedor'>
      <h2>Nuevo Producto</h2>
      <form className='formulario' onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
    <label>Imagen</label>
<input
  type="file"
  name="imagen"
  accept="image/*"
  onChange={(e) =>
    setProducto(prev => ({
      ...prev,
      imagen: e.target.files[0]
    }))
  }
/>


        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />

        <label htmlFor="grupo_muscular_id">Categoría ID</label>
        <select
          id="categoriaId"
          name="categoriaId"
          value={producto.categoriaId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar grupo</option>
          {categorias.map(grupo => (
            <option key={grupo.id} value={grupo.id}>
              {grupo.nombre}
            </option>
          ))}
          </select>

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          required
        />

          <div className="acomodar">
          <button type="submit" className='boton'>Crear Producto</button>
          <button className='atras'>
            <a href="/productos">Volver</a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AltaProd;



    