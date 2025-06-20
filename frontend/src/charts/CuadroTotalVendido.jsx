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

import '../css/cuadroProductosIngresados.css';

const CuadroProductosIngresados = () => {
  const [datos, setDatos] = useState([]);
  const [anio, setAnio] = useState('');
  const [mes, setMes] = useState('');

  const fetchEstadisticas = async () => {
    try {
      const params = {};
      if (anio) params.anio = anio;
      if (mes) params.mes = mes;

      const res = await axios.get('http://localhost:3032/api/reservas/estadisticasPorProducto', { params });

      const formateado = res.data.map(item => ({
        mesAnio: new Date(item.Reserva.fecha).toLocaleDateString('es-AR', {
          year: 'numeric',
          month: '2-digit',
        }),
        id_producto: item.id_producto,
        cantidad: Number(item.cantidad),
        monto: Number(item.subtotal),
      }));

      setDatos(formateado);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    }
  };

  useEffect(() => {
    fetchEstadisticas();
  }, [anio, mes]);

  const totalProductos = datos.reduce((sum, item) => sum + item.cantidad, 0);
  const totalMonto = datos.reduce((sum, item) => sum + item.monto, 0);

  return (
    <div className="cuadro-container">
      <h2 className="cuadro-titulo">📊 Productos Ingresados</h2>

      <div className="cuadro-filtros">
        <label>
          Año:
          <input
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            placeholder="Ej: 2025"
          />
        </label>
        <label>
          Mes:
          <select value={mes} onChange={(e) => setMes(e.target.value)}>
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

      <div className="grafico-wrapper">
        <ResponsiveContainer>
          <BarChart data={datos}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mesAnio" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h4 className="cuadro-subtitulo">📦 Detalle por producto</h4>
      <div className="tabla-wrapper">
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>Mes/Año</th>
              <th>ID Producto</th>
              <th>Cantidad</th>
              <th>Subtotal ($)</th>
            </tr>
          </thead>
          <tbody>
            {datos.length === 0 ? (
              <tr>
                <td colSpan={4}>No hay datos para mostrar</td>
              </tr>
            ) : (
              datos.map((item, index) => (
                <tr key={index}>
                  <td>{item.mesAnio}</td>
                  <td>{item.id_producto}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.monto.toLocaleString('es-AR')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="totales">
        <p><strong>🔢 Total productos ingresados:</strong> {totalProductos}</p>
        <p><strong>💰 Total monto:</strong> ${totalMonto.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
      </div>
    </div>
  );
};

export default CuadroProductosIngresados;