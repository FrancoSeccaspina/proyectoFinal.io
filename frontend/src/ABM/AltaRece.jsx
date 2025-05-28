import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css';

const AltaReceta = () => {
  const navigate = useNavigate();
  const [receta, setReceta] = useState({
    nombre: '',
    descripcion: '',
    categoriaId: '',
    //imagen: '',
    
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(receta)
    const formData = new FormData();
    formData.append('nombre', receta.nombre);
    formData.append('descripcion', receta.descripcion);
    formData.append('categoriaId', receta.categoriaId);
    formData.append('imagen', receta.imagen);

    try {
      await axios.post('http://localhost:3032/api/recetas', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/Recetas');
    } catch (error) {
      console.error('Error al crear receta:', error);
      alert(`Error del servidor: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className='contenedor'>
      <h2>Crear Nueva Receta</h2>
      <form onSubmit={handleSubmit} className='formulario'>

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={receta.nombre}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={receta.descripcion}
          onChange={handleChange}
          required
        />

        <label>Imagen</label>
              <input
        type="file"
        name="imagen"
        accept="image/*"
        onChange={(e) =>
          setReceta(prev => ({
            ...prev,
            imagen: e.target.files[0]
          }))
        }
/>

        <label htmlFor="categoriaId">Categoría</label>
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
          <button type="submit" className='boton'>Crear Receta</button>
          <button className='atras'>
            <a href="/recetas">Volver</a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AltaReceta;


/*import Reac, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/edicion.css';

const AltaRece = () => {
    const navigate = useNavigate();
    const [recetas, setRecetas] = useState({
        nombre:'',
        descripcion:'',
        categoriaId: '',
        imagen:'',
    });
    
    const [categoriaRecetas, setCategoriaReceta] = useState([]);

    useEffect(() => {
        const fetchGrupos = async() => {
            try{
                const response = await axios.get('http://localhost:3032/api/categoriaRecetas');
                setCategoriaReceta(response.data);
            }catch(error){
                console.log('Error al obtener categpria de productos:', error);
            }
        };
        fetchGrupos();
    },[]);

    const handleChange = (e) => {
        const{ name, value } = e.target;
        setRecetas(prev => ({
            ...prev,
            [name]:value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            await axios.post('http://localhost:3032/api/recetas', {
                nombre: recetas.nombre,
                descripcion: recetas.descripcion,
                categoriaId: recetas.categoriaId,
                imagen: recetas.imagen,
            });
            navigate('/Recetas');
        }catch(error){
            console.error('Error al crear una receta:', error);
            alert(` Error del servidor: ${ error.response?.data?.message || error.message}`);
        }
    };

    return(
        <div className="contenedor">
            <h2>Crear Nueva Receta</h2>
            <form onSubmit={handleChange} className="formulario">
                <label>Nombre</label>
                <input type="text" name="nombre" value={recetas.nombre} onChange={handleChange}  required />

                <label>Descripcion</label>
                <input type="text" name="descripcion" value={recetas.descripcion} onChange={handleChange}  required />

                <label htmlFor="categorua_muscular_id">CategoriaId</label>
                <select id="categoriaId" name="categoriaId" value={recetas.categoriaId} onChange={handleChange} required>
                    <option value="">Seleccionar Categoria</option>
                    {categoriaRecetas.map(grupo => (
                        <option key={grupo.id} value={grupo.id}>{grupo.nombre}</option>
                    ))}
                </select>
                <label>Imagen</label>
                <input type="file" name="imagen" accept="image/*" />  

                <div className="acomodar">
                    <button type="submit" className="boton">Crear Receta</button>
                    <button className="atras"><a href="/recetas">Volver</a></button>
                </div>
            </form>
        </div>
    );
};
export default AltaRece;*/