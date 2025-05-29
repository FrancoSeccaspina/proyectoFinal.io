import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CuotaFormulario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [cuotas, setCuotas] = useState([]);
  const [nuevaCuota, setNuevaCuota] = useState({
    fecha: '',
    descripcion: '',
    monto: '',
    estado: 'PENDIENTE',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usuarioRes, cuotasRes] = await Promise.all([
          axios.get(`http://localhost:3032/api/usuarios/${id}`),
          axios.get(`http://localhost:3032/api/cuota/${id}`)
        ]);
        setUsuario(usuarioRes.data);
        setCuotas(cuotasRes.data);
      } catch (err) {
        console.error(err);
        alert('Error al cargar usuario/cuotas');
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setNuevaCuota({ ...nuevaCuota, [e.target.name]: e.target.value });
  };

  const handleAgregarCuota = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3032/api/cuotas', {
        ...nuevaCuota,
        id_usuario: parseInt(id)
      });
      setCuotas([...cuotas, res.data]);
      setNuevaCuota({ fecha: '', descripcion: '', monto: '', estado: 'PENDIENTE' });
    } catch (err) {
      console.error(err);
      alert('Error al registrar cuota');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Cuotas de {usuario?.nombre} - DNI: {usuario?.dni}</h2>

      <form onSubmit={handleAgregarCuota} style={{ marginBottom: '2rem' }}>
        <label>Fecha: <input type="date" name="fecha" value={nuevaCuota.fecha} onChange={handleInputChange} required /></label>
        <label>Descripción: <input name="descripcion" value={nuevaCuota.descripcion} onChange={handleInputChange} required /></label>
        <label>Monto: <input type="number" name="monto" value={nuevaCuota.monto} onChange={handleInputChange} required /></label>
        <button type="submit">Agregar</button>
      </form>

      <table border="1" cellPadding="6" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuotas.map((cuota, index) => (
            <tr key={cuota.id}>
              <td>{index + 1}</td>
              <td>{cuota.fecha}</td>
              <td>{cuota.descripcion}</td>
              <td>${cuota.monto}</td>
              <td>{cuota.estado}</td>
              <td>
                {/* Placeholder icons */}
                <button title="Editar">✏️</button>
                <button title="Eliminar">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CuotaFormulario;

