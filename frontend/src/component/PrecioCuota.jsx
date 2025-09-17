import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/precioCuota.css';
const Cuota = () => {
  const [cuotaPrecio, setCuota] = useState([]);
  const showData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/precioCuota`, { credentials: 'include' });
      const data = await response.json();
      console.log('DATA RECIBIDA:', data);
      setCuota(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };
   useEffect(() => {
      showData();
    }, []);
    const [ultimoPrecio, setUltimoPrecio] = useState(null);

      useEffect(() => {
        const fetchUltimoPrecio = async () => {
          try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/precioCuota/ultima`, 
              { withCredentials: true }
            );
            setUltimoPrecio(res.data.precio);
          } catch (error) {
            console.error('Error al obtener el último precio de cuota:', error);
          }
        };
        fetchUltimoPrecio();
        }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h3>Precio Cuota Actual: {ultimoPrecio !== null ? `$${ultimoPrecio}` : 'Cargando...'}</h3>
      <Link to={`/nuevoPrecioCuota`} className="btn btn-primary">
          Actualizar Precio
        </Link>   
      <table border="1" cellPadding="6" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {cuotaPrecio.map((cuotaPrecio, index) => (
            <tr key={cuotaPrecio.id}>
              <td>{index + 1}</td>
              <td>{cuotaPrecio.fecha}</td>
              <td>{cuotaPrecio.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

  export default Cuota;