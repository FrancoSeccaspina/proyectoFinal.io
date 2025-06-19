import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/edicion.css'; 
const AltaCuota = () => {
  const { idUsuario } = useParams(); 
  const navigate = useNavigate();

  const [cuota, setCuota] = useState({
    fecha: '',
    descripcion: '',
    estado: '',
    id_usuario: idUsuario || '',
    pagado: '',
    monto: 0,
    faltante: 0,
    sobrante: 0,
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

  // Recalcula monto, faltante y sobrante cada vez que cambia fecha o pagado
  useEffect(() => {
    if (cuota.fecha) {
      const montoCalculado = ultimoPrecio;
      const pagadoNum = parseFloat(cuota.pagado) || 0;

      let faltante = 0;
      let sobrante = 0;
      let estado = 'PENDIENTE';

      if (pagadoNum < montoCalculado) {
        faltante = montoCalculado - pagadoNum;
      } else if (pagadoNum > montoCalculado) {
        sobrante = pagadoNum - montoCalculado;
        estado = 'PAGADA';
      } 

      setCuota(prev => ({
        ...prev,
        monto: montoCalculado,
        faltante,
        sobrante,
        estado
      }));
    }
  }, [cuota.fecha, cuota.pagado]);

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

        <label>Precio Actual Cuota</label>
        <input
          type="number"
          name="monto"
          value={ultimoPrecio}
          readOnly
        />

        <label>Pagado</label>
        <input
          type="number"
          name="pagado"
          value={cuota.pagado}
          onChange={handleChange}
          min="0"
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
        <input
          type="text"
          name="estado"
          value={cuota.estado}
          onChange={handleChange}
          readOnly
        />

        <label>Faltante</label>
        <input
          type="number"
          name="faltante"
          value={cuota.faltante}
          readOnly
        />

        <label>Sobrante</label>
        <input
          type="number"
          name="sobrante"
          value={cuota.sobrante}
          readOnly
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