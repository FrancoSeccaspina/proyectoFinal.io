import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css';

const EdicionUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    aptoMedico: '',
    dni: '',
  });
  // Cargar datos del usuario
  useEffect(() => {
    axios.get(`http://localhost:3032/api/usuarios/${id}`)
    .then(res => setUsuario(res.data))
    .catch(err => console.error('Error al cargar producto:', err));
    }, [id]);
    // Manejar cambios

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'imagen') {
    setUsuario(prev => ({
      ...prev,
      imagen: files[0] // solo archivo nuevo
    }));
  } else {
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  }
};
    // Enviar formulario con FormData
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', usuario.nombre);
    formData.append('apellido', usuario.apellido);
    formData.append('celular', usuario.celular);
    formData.append('aptoMedico', usuario.aptoMedico);
    formData.append('dni', usuario.dni);

    // solo adjuntamos imagen si es un archivo nuevo
    if (usuario.imagen instanceof File) {
      formData.append('imagen', usuario.imagen);
    }
      axios.put(`http://localhost:3032/api/usuarioEditar/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => navigate('/Usuarios'))
        .catch(err => console.error('Error al editar:', err));
    };
  return (
    <div className='contenedor'>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit} className='formulario'>
        <label>Nombre</label>
        <input 
          type="text" 
          name="nombre" 
          value={usuario.nombre} 
          onChange={handleChange} 
          required 
        />

        <label>Apellido</label>
        <input 
          type="text" 
          name="apellido" 
          value={usuario.apellido} 
          onChange={handleChange} 
          required 
        />

        <label>Celular</label>
        <input 
          type="tel" 
          name="celular" 
          value={usuario.celular} 
          onChange={handleChange} 
          required 
        />
        <label>Apto Médico</label>
        <input 
          type="tel" 
          name="aptomedico" 
          value={usuario.aptoMedico} 
          onChange={handleChange} 
          required 
        />

        <label>DNI</label>
        <input 
          type="text" 
          name="dni" 
          value={usuario.dni} 
          onChange={handleChange} 
          required 
        />

        <div className="acomodar">
          <button type="submit" className='boton'>Guardar Cambios</button>
          <button className='atras'><a href="/usuarios">Volver</a></button>
        </div>
      </form>
    </div>
  );
};

export default EdicionUsuario;
