import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BotonEliminarRutina = ({ id }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta rutina?")) {
      try {
        await axios.delete(`http://localhost:3032/api/ejercicios/${id}`);
        alert("Rutina eliminada correctamente");
        navigate('/Rutinas');
      } catch (error) {
        console.error('Error al eliminar rutina:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <button class="btn btn-danger" onClick={handleDelete}>
      Eliminar
    </button>
  );
};

export default BotonEliminarRutina;