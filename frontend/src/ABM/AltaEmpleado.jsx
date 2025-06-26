
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css'; 

const AltaEmpleado = () => {
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    actividad: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3032/api/empleados', empleado);
        console.log("empleado creado exitosamente");
        navigate('/Empleados');
      } catch (error) {
        console.error('Error al crear empleado:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    };

    return (
        <div className="contenedor">
          <h2>Alta de Empleado</h2>
          <form onSubmit={handleSubmit} className="formulario">
          <label>Nombre</label>
          <textarea
          name="nombre"
          value={empleado.nombre}
          onChange={handleChange}
          required
        />
          <label>Apellido</label>
          <textarea
          name="apellido"
          value={empleado.apellido}
          onChange={handleChange}
          required
        />
          <label>Numero de Celular</label>
          <textarea
          type="number"
          name="celular"
          value={empleado.celular}
          onChange={handleChange}
          required
        />
        <label>Actividad</label>
          <textarea
          name="actividad"
          value={empleado.actividad}
          onChange={handleChange}
          required
        />
          <div className="acomodar">
          <button type="submit" className="boton">Crear Empleado</button>
          <button type="button" className="atras" onClick={() => navigate('/Empleados')}>Volver</button>
        </div>
      </form>
    </div>
  );
};

export default AltaEmpleado;