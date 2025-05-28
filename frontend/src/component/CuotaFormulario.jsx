import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../css/edicion.css';

const CuotaFormulario = () => {
  const { id } = useParams(); // id del usuario
  const navigate = useNavigate();
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3032/api/cuota', {
        usuarioId: parseInt(id),
        monto: parseFloat(monto),
        fecha
      });

      alert('Cuota registrada correctamente');
      navigate('/usuarios'); // o adonde quieras volver
    } catch (error) {
      console.error('Error al guardar cuota:', error);
      alert(`Error del servidor: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Registrar Cuota para Usuario ID: {id}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Monto:</label>
          <input 
            type="number" 
            value={monto} 
            onChange={(e) => setMonto(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Guardar Cuota</button>
      </form>
    </div>
  );
};

export default CuotaFormulario;
