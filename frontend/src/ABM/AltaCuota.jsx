import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css'; 

const AltaCuota = () => {
  const { idUsuario } = useParams(); 
  const navigate = useNavigate(); // ⬅️ Faltaba esto

  const [cuota, setCuota] = useState({
    fecha: '',
    descripcion: '',
    monto: '',
    estado: '',
    id_usuario: idUsuario || ''  
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuota(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3032/api/cuotas', cuota);
      console.log("Cuota creada exitosamente");
      navigate('/Usuarios');
    } catch (error) {
      console.error('Error al crear cuota:', error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="contenedor">
      <h2>Alta de Cuota</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          value={cuota.fecha}
          onChange={handleChange}
          required
        />

        <label>Monto</label>
        <input
          type="number"
          name="monto"
          value={cuota.monto}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={cuota.descripcion}
          onChange={handleChange}
          required
        />

        <label>Estado</label>
        <textarea
          name="estado"
          value={cuota.estado}
          onChange={handleChange}
          required
        />

        <div className="acomodar">
          <button type="submit" className="boton">Crear Cuota</button>
          <button type="button" className="atras" onClick={() => navigate('/Usuarios')}>Volver</button>
        </div>
      </form>
    </div>
  );
};

export default AltaCuota;
