import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css';
const EdicionRutina = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ejercicio, setRutina] = useState({
    nombre: '',
    descripcion: '',
    grupo_muscular_id: '',
    video: '',
    titulo: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3032/api/ejercicios/${id}`)
      .then(res => setRutina(res.data))
      .catch(err => console.error('Error al cargar rutina:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
      setRutina(prev => ({
        ...prev,
        video: files[0]
      }));
    } else {
      setRutina(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', ejercicio.nombre);
    formData.append('descripcion', ejercicio.descripcion);
    formData.append('grupo_muscular_id', ejercicio.grupo_muscular_id);
    formData.append('video', ejercicio.video);
    formData.append('titulo', ejercicio.titulo);

    axios.put(`http://localhost:3032/api/ejercicioEditar/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
        .then(() => navigate('/Rutinas'))
        .catch(err => console.error('Error al editar:', err));
    };

  return (
    <div className='contenedor'>
      <h2>Editar Rutina</h2>
      <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={ejercicio.nombre}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={ejercicio.descripcion}
          onChange={handleChange}
          required
        />
        <label>Video</label>
        <textarea
          name="video"
          value={ejercicio.video}
          onChange={handleChange}
          required
        />

        <label>Ejecución</label>
        <input
          type="text"
          name="titulo"
          value={ejercicio.titulo}
          onChange={handleChange}
          required
        />

        <div className="acomodar">
          <button type="submit" className='boton'>Guardar Cambios</button>
          <button className='atras'><a href="/rutinas">Volver</a></button>
        </div>
      </form>
    </div>
  );
};

export default EdicionRutina;
