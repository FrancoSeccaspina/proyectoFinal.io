import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const EdicionCuota = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cuota, setCuota] = useState({
        fecha:'',
        descripcion:'',
        monto:'',
        estado:'',
        sobrante:'',
        faltante:''
    });

    useEffect(() => {
        axios.get(`http://localhost:3032/api/cuotas/${id}`)
        .then(res => setCuota(res.data))
        .catch(err => console.error('Error al cargar cuotas:', err));
    }, [id]);

    const handleChange = (e) => {
    const { name, value } = e.target;
      setCuota(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3032/api/editarCuota/${id}`, cuota)
          .then(() => {
            console.log("Cuota actualizada");
            navigate('/Usuarios');
          })
          .catch(err => console.error('Error al editar:', err));
      };
      
  return (
    <div className='contenedor'>
      <h2>Editar Cuota</h2>
      <form onSubmit={handleSubmit} className='formulario'>
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

         <label>Deuda</label>
        <input
          type="number"
          name="faltante"
          value={cuota.faltante}
          onChange={handleChange}
          required
        />

         <label>Ganacia</label>
        <input
          type="number"
          name="sobrante"
          value={cuota.sobrante}
          onChange={handleChange}
          required
        />
        <div className="acomodar">
          <button type="submit" className='boton'>Guardar Cambios</button>
          <button className='atras'><a href="/Usuarios">volver</a></button>
        </div>
      </form>
    </div>
  );
};

export default EdicionCuota;