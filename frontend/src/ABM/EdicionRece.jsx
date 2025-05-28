import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css';

const EdicionReceta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receta, setReceta] = useState({
    nombre: '',
    descripcion: '',
    categoriaId: '',
    imagen: ''
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3032/api/categoriaRecetas');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3032/api/recetas/${id}`)
      .then(res => setReceta(res.data))
      .catch(err => console.error('Error al cargar receta:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setReceta(prev => ({
        ...prev,
        imagen: files[0]
      }));
    } else {
      setReceta(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', receta.nombre);
    formData.append('descripcion', receta.descripcion);
    formData.append('categoriaId', receta.categoriaId);
    if (receta.imagen) {
      formData.append('imagen', receta.imagen);
    }

    try {
      await axios.put(`http://localhost:3032/api/recetaEditar/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/recetas');
    } catch (err) {
      console.error('Error al editar receta:', err);
    }
  };

  return (
    <div className='contenedor'>
      <h2>Editar Receta</h2>
      <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
        <label>Nombre</label>
        <input type="text" name="nombre" value={receta.nombre} onChange={handleChange} required />

        <label>Imagen</label>
        <input type="file" name="imagen" onChange={handleChange} />

        <label>Descripción</label>
        <textarea name="descripcion" value={receta.descripcion} onChange={handleChange} required />
        <label>Categoria</label>
        <select
          id="categoriaId"
          name="categoriaId"
          value={receta.categoriaId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map(grupo => (
            <option key={grupo.id} value={grupo.id}>
              {grupo.nombre}
            </option>
          ))}
        </select>
        <div className="acomodar">
          <button type="submit" className='boton'>Guardar Cambios</button>
          <button className='atras'><a href="/recetas">Volver</a></button>
        </div>
      </form>
    </div>
  );
};

export default EdicionReceta;
