import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { createChart } from 'lightweight-charts';
//const firstChart = createChart(document.getElementById('firstContainer'));
const CuadroCuotaAbonada = () => {
  const [graficoData, setGraficoData] = useState([]);
  const [anio, setAnio] = useState('');
  const [mes, setMes] = useState('');

  const fetchEstadisticas = async () => {
    try {
      const params = {};
      if (anio) params.anio = anio;
      if (mes) params.mes = mes;

      const res = await axios.get('http://localhost:3032/api/estadisticas', { params });

      const formateado = res.data.map(item => ({
        mesAnio: `${item.mes.toString().padStart(2, '0')}/${item.anio}`,
        cantidad: Number(item.cantidad),
        monto: Number(item.monto)
      }));

      setGraficoData(formateado);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    }
  };
  
  useEffect(() => {
    fetchEstadisticas();
  }, [anio, mes]);

  const totalCuotas = graficoData.reduce((sum, item) => sum + item.cantidad, 0);
  const totalMonto = graficoData.reduce((sum, item) => sum + item.monto, 0);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Estadísticas de Cuotas Abonadas</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          Año:
          <input
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            placeholder="Ej: 2024"
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <label>
  Mes:
  <select value={mes} onChange={(e) => setMes(e.target.value)} style={{ marginLeft: '0.5rem' }}>
    <option value="">Todos</option>
    {[
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ].map((nombreMes, index) => (
      <option key={index + 1} value={index + 1}>
        {nombreMes}
      </option>
    ))}
  </select>
</label>

      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={graficoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mesAnio" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h4 style={{ marginTop: '2rem' }}>Cuadro de cuotas abonadas por mes</h4>
      <table border="1" cellPadding="6" style={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Mes/Año</th>
            <th>Cantidad de cuotas abonadas</th>
          </tr>
        </thead>
        <tbody>
          {graficoData.length === 0 ? (
            <tr>
              <td colSpan="2">No hay datos para mostrar</td>
            </tr>
          ) : (
            graficoData.map((item, index) => (
              <tr key={index}>
                <td>{item.mesAnio}</td>
                <td>{item.cantidad}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

              <p style={{ marginTop: '1rem' }}>
          <strong>Total abonadas:</strong> {totalCuotas}
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>Total montos abonados:</strong> ${totalMonto.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </p>
          <section className='Proveedores'>

          </section>
    </div>
  );
};

export default CuadroCuotaAbonada;