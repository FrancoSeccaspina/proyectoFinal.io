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
    dni: '',
    fecha_nacimiento: '',
    rol: '',
    celular: '',
    aptoMedico: '',
    
  });
  // Cargar datos del usuario
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/usuarios/${id}`, { withCredentials: true })
    .then(res => setUsuario(res.data))
    .catch(err => console.error('Error al cargar Usuario:', err));
    }, [id]);
    // Manejar cambios

    const handleChange = (e) => {
      const { name, value, files } = e.target;
    
      if (name === 'imagen' || name === 'aptoMedico') {
        setUsuario(prev => ({
          ...prev,
          [name]: files[0]
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
      formData.append('dni', usuario.dni);
      formData.append('fecha_nacimiento', usuario.fecha_nacimiento);
      formData.append('rol', usuario.rol);
      formData.append('celular', usuario.celular);
    
      // Muy importante:
      if (usuario.aptoMedico instanceof File) {
        formData.append('aptoMedico', usuario.aptoMedico); 
      }
    
      if (usuario.imagen instanceof File) {
        formData.append('imagen', usuario.imagen);
      }
    
      axios.put(`${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/usuarios/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true 
      })
        .then(() => navigate('/usuarios'))
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
        <label>DNI</label>
        <input 
          type="text" 
          name="dni" 
          value={usuario.dni} 
          onChange={handleChange} 
          required 
        />
        <label>Fecha de nacimiento</label>
        <input 
          type="date" 
          name="fecha_nacimiento" 
          value={usuario.fecha_nacimiento} 
          onChange={handleChange} 
          required 
        />
        <label>Rol</label>
        <select 
          name="rol" 
          value={usuario.rol} 
          onChange={handleChange} 
          required
        >
          <option value="">-- Seleccionar rol --</option>
          <option value="cliente">Cliente</option>
          <option value="invitado">Invitado</option>
          <option value="jubilado">Jubilado</option>
          <option value="socio">Socio</option>
        </select>


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
          type="file" 
          name="aptoMedico"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleChange} 
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
