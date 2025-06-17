import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css'; 
const AltaPrecioCuota = () => {
    const navigate = useNavigate();
    
      const [cuota, setCuotaPrecio] = useState({
        fecha: '',
        precio: '',
      });
      const [ultimoPrecio, setUltimoPrecio] = useState(null);

      useEffect(() => {
        const fetchUltimoPrecio = async () => {
          try {
            const res = await axios.get('http://localhost:3032/api/precioCuota/ultima');
            setUltimoPrecio(res.data.precio);
          } catch (error) {
            console.error('Error al obtener el último precio de cuota:', error);
          }
        };
    
        fetchUltimoPrecio();
      }, []);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setCuotaPrecio(prev => ({
          ...prev,
          [name]: value
        }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3032/api/precioCuota', cuota, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            navigate('/PrecioCuota');
          } catch (error) {
            console.error('Error al crear producto:', error);
          }
        };
        return (
            <div className='contenedor'>
            <h2>Actualizacion Precio Cuota</h2>
            <h3>Precio Cuota Actual: {ultimoPrecio !== null ? `$${ultimoPrecio}` : 'Cargando...'}</h3>
            <form className='formulario' onSubmit={handleSubmit}>
                <label> Precio: </label>
                    <input
                    type="number"
                    name="precio"
                    value={cuota.precio}
                    onChange={handleChange}
                    required
                    />
                <label>Fecha</label>
                    <input
                    type="date"
                    name="fecha"
                    value={cuota.fecha}
                    onChange={handleChange}
                    required
                    />
                    <div className="acomodar">
                    <button type="submit" className="boton">Actualizar</button>
                    <button type="button" className="atras" onClick={() => navigate('/PrecioCuota')}>Volver</button>
                    </div>
            </form>
            </div>
        );
};

export default AltaPrecioCuota;