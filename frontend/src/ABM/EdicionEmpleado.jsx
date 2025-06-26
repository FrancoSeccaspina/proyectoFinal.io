import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css';
const EdicionEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    actividad: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3032/api/empleados/${id}`)
      .then(res => setEmpleado(res.data))
      .catch(err => console.error('Error al cargar empleados:', err));
  }, [id]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
        setEmpleado(prev => ({
        ...prev,
        video: files[0]
      }));
    } else {
        setEmpleado(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3032/api/empleadoEditar/${id}`, empleado)
          .then(() => {
            console.log("empleado actualizadp");
            navigate('/Empleados');
          })
          .catch(err => console.error('Error al editar:', err));
      };

    return (
        <div className='contenedor'>
          <h2>Editar Empleado</h2>
          <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={empleado.nombre}
              onChange={handleChange}
              required
            />
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              value={empleado.apellido}
              onChange={handleChange}
              required
            />
            <label>Celular</label>
            <input
              type="number"
              name="celular"
              value={empleado.celular}
              onChange={handleChange}
              required
            />
            <label>Actividad</label>
            <input
              type="text"
              name="actividad"
              value={empleado.actividad}
              onChange={handleChange}
              required
            />
            <div className="acomodar">
              <button type="submit" className='boton'>Guardar Cambios</button>
              <button className='atras'><a href="/Proveedores">Volver</a></button>
            </div>
          </form>
        </div>
      );
    };
    
    export default EdicionEmpleado;