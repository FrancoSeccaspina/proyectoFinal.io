import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css';

const AltaRuti = () => {
  const navigate = useNavigate();
  const [rutina, setRutina] = useState({
    nombre: '',
    descripcion: '',
    grupo_muscular_id: '',
    video: '',
    titulo: '',
  });

  const [gruposMusculares, setGruposMusculares] = useState([]);
  
  // Cargar los grupos musculares al montar el componente
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get('http://localhost:3032/api/categoriaGrupoMuscular');
        setGruposMusculares(response.data);
      } catch (error) {
        console.error('Error al obtener grupos musculares:', error);
      }
    };

    fetchGrupos();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRutina(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3032/api/ejercicios', {
        nombre: rutina.nombre,
        descripcion: rutina.descripcion,
        grupo_muscular_id: parseInt(rutina.grupo_muscular_id),
        video: rutina.video,
        titulo: rutina.titulo,
      });

      navigate('/Rutinas');
    } catch (error) {
      console.error('Error al crear rutina:', error);
      alert(`Error del servidor: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className='contenedor'>
      <h2>Crear Nueva Rutina</h2>
      <form onSubmit={handleSubmit} className='formulario'>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={rutina.nombre}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={rutina.descripcion}
          onChange={handleChange}
          required
        />

        <label htmlFor="grupo_muscular_id">Grupo Muscular</label>
        <select
          id="grupo_muscular_id"
          name="grupo_muscular_id"
          value={rutina.grupo_muscular_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar grupo</option>
          {gruposMusculares.map(grupo => (
            <option key={grupo.id} value={grupo.id}>
              {grupo.nombre}
            </option>
          ))}
        </select>

        <label>Video</label>
        <input
          type="text"
          name="video"
          value={rutina.video}
          onChange={handleChange}
          placeholder="https://www.youtube.com/watch?v=..."
          required
        />

        <label>Ejecución</label>
        <input
          type="text"
          name="titulo"
          value={rutina.titulo}
          onChange={handleChange}
          required
        />

        <div className="acomodar">
          <button type="submit" className='boton'>Crear Rutina</button>
          <button className='atras'>
            <a href="/rutinas">Volver</a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AltaRuti;

