import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css';

const EdicionProductos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    stock: '',
    imagen: '' // imagen actual del producto
  });
  // Cargar datos del producto
  useEffect(() => {
    axios.get(`http://localhost:3032/api/productos/${id}`)
      .then(res => setProducto(res.data))
      .catch(err => console.error('Error al cargar producto:', err));
  }, [id]);

  // Manejar cambios
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'imagen') {
      setProducto(prev => ({
        ...prev,
        imagen: files[0] // solo archivo nuevo
      }));
    } else {
      setProducto(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Enviar formulario con FormData
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('descripcion', producto.descripcion);
    formData.append('stock', producto.stock);

    // solo adjuntamos imagen si es un archivo nuevo
    if (producto.imagen instanceof File) {
      formData.append('imagen', producto.imagen);
    }

    axios.put(`http://localhost:3032/api/productoEditar/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => navigate('/productos'))
      .catch(err => console.error('Error al editar:', err));
  };

  return (
    <div className='contenedor'>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit} className='formulario'>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />

        {/* Mostrar imagen actual */}
        {typeof producto.imagen === 'string' && (
          <div>
            <label>Imagen actual</label>
            <img
              src={`http://localhost:3032/images/${producto.imagen}`}
              alt="Imagen actual"
              style={{ maxWidth: '200px', display: 'block', marginBottom: '10px' }}
            />
          </div>
        )}

        <label>Subir nueva imagen</label>
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

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          required
        />

        <div className="acomodar">
          <button type="submit" className='boton'>Guardar Cambios</button>
          <button className='atras'><a href="/productos">volver</a></button>
        </div>
      </form>
    </div>
  );
};

export default EdicionProductos;
