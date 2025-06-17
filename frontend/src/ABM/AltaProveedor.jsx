
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css'; 

const AltaProveedor = () => {
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState({
    nombre: '',
    apellido: '',
    celular: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3032/api/proveedores', proveedor);
        console.log("Proveedor creado exitosamente");
        navigate('/Proveedores');
      } catch (error) {
        console.error('Error al crear proveedor:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    };

    return (
        <div className="contenedor">
          <h2>Alta de Proveedor</h2>
          <form onSubmit={handleSubmit} className="formulario">
          <label>Nombre</label>
          <textarea
          name="nombre"
          value={proveedor.nombre}
          onChange={handleChange}
          required
        />
          <label>Apellido</label>
          <textarea
          name="apellido"
          value={proveedor.apellido}
          onChange={handleChange}
          required
        />
          <label>Numero de Celular</label>
          <textarea
          type="number"
          name="celular"
          value={proveedor.celular}
          onChange={handleChange}
          required
        />
          <div className="acomodar">
          <button type="submit" className="boton">Crear Proveedor</button>
          <button type="button" className="atras" onClick={() => navigate('/Proveedores')}>Volver</button>
        </div>
      </form>
    </div>
  );
};

export default AltaProveedor;