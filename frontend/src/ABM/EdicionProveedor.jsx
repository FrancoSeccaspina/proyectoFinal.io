import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css';
const EdicionProveedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState({
    nombre: '',
    apellido: '',
    celular: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3032/api/proveedores/${id}`)
      .then(res => setProveedor(res.data))
      .catch(err => console.error('Error al cargar rutina:', err));
  }, [id]);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
        setProveedor(prev => ({
        ...prev,
        video: files[0]
      }));
    } else {
        setProveedor(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3032/api/proveedorEditar/${id}`, proveedor)
          .then(() => {
            console.log("proveedor actualizadp");
            navigate('/Proveedores');
          })
          .catch(err => console.error('Error al editar:', err));
      };

    return (
        <div className='contenedor'>
          <h2>Editar Proveedor</h2>
          <form onSubmit={handleSubmit} className='formulario' encType="multipart/form-data">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={proveedor.nombre}
              onChange={handleChange}
              required
            />
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              value={proveedor.apellido}
              onChange={handleChange}
              required
            />
            <label>Celular</label>
            <input
              type="number"
              name="celular"
              value={proveedor.celular}
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
    
    export default EdicionProveedor;