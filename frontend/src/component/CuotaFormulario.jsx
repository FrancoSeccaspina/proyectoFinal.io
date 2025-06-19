
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const CuotaFormulario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [cuotas, setCuotas] = useState([]);
  const [graficoData, setGraficoData] = useState([]);
  const [filtroAnio, setFiltroAnio] = useState('');
  const [filtroMes, setFiltroMes] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usuarioRes, cuotasRes] = await Promise.all([
          axios.get(`http://localhost:3032/api/usuarios/${id}`),
          axios.get(`http://localhost:3032/api/cuotasdelUsuario/${id}`)
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

  useEffect(() => {
    const fetchGrafico = async () => {
      try {
        const params = {};
        if (filtroAnio) params.anio = filtroAnio;
        if (filtroMes) params.mes = filtroMes;
        if (id) params.id_usuario = id;

        const res = await axios.get('http://localhost:3032/api/abonadas-por-mes', { params });
        const formateado = res.data.map(item => ({
          mesAnio: `${item.mes.toString().padStart(2, '0')}/${item.anio}`,
          cantidad: Number(item.cantidad)
        }));
        setGraficoData(formateado);
      } catch (err) {
        console.error('Error al cargar gráfico:', err);
      }
    };
    fetchGrafico();
  }, [filtroAnio, filtroMes, id]);

  const handleDelete = async (idCuota) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta Cuota?")) {
      try {
        await axios.delete(`http://localhost:3032/api/cuotas/${idCuota}`);
        setCuotas(prevCuotas => prevCuotas.filter(c => c.id !== idCuota));
      } catch (error) {
        console.error('Error al eliminar cuota:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Cuotas de {usuario?.nombre} - DNI: {usuario?.dni}</h2>

      <table border="1" cellPadding="6" style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Deuda</th>
            <th>Ganancia</th>
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
              <td>${cuota.faltante}</td>
              <td>${cuota.sobrante}</td>
              <td>
                <Link to={`/cuota/editar/${cuota.id}`} className="btn btn-success">Editar</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(cuota.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CuotaFormulario;
