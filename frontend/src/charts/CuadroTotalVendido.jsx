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
import * as XLSX from 'xlsx';
import '../css/cuadroProductosIngresados.css';

const CuadroProductosIngresados = () => {
  const [graficoData, setGraficoData] = useState([]);
  const [anio, setAnio] = useState('');
  const [mes, setMes] = useState('');

  const fetchEstadisticas = async () => {
    try {
      const params = {};
      if (anio !== '') params.anio = Number(anio);
      if (mes !== '') params.mes = Number(mes);

      const res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/reservas/estadisticasPorProducto`, {
        params,
        withCredentials: true
      });

      const payload = Array.isArray(res.data) ? res.data : (res.data.data || []);

      const formateadoConMeta = payload.map(item => {
        const fechaRaw = item?.Reserva?.fecha ?? item?.fecha ?? item?.reserva_fecha;
        let mesAnio = 'Sin fecha';
        let year = null;
        let month = null;

        if (fechaRaw) {
          const d = new Date(fechaRaw);
          if (!isNaN(d)) {
            month = d.getMonth() + 1;
            year = d.getFullYear();
            mesAnio = `${String(month).padStart(2, '0')}/${year}`;
          }
        }

        return {
          mesAnio,
          id_producto: item.id_producto ?? item.productoId ?? 'N/A',
          nombre_producto: item.Producto?.nombre ?? `ID: ${item.id_producto}`,
          cantidad: Number(item.cantidad ?? 0),
          monto: Number(item.subtotal ?? item.total ?? 0),
          __year: year,
          __month: month,
        };
      });

      let resultado = formateadoConMeta;
      if (anio !== '') resultado = resultado.filter(r => r.__year === Number(anio));
      if (mes !== '') resultado = resultado.filter(r => r.__month === Number(mes));
      setGraficoData(resultado.map(({ __year, __month, ...rest }) => rest));
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      setGraficoData([]);
    }
  };

  useEffect(() => {
    fetchEstadisticas();
  }, [anio, mes]);

  const totalProductos = graficoData.reduce((sum, item) => sum + item.cantidad, 0);
  const totalMonto = graficoData.reduce((sum, item) => sum + item.monto, 0);

  const exportarExcel = () => {
    const datosExcel = graficoData.map(item => ({
      "Mes/Año": item.mesAnio,
      "Producto": item.nombre_producto,
      "Cantidad": item.cantidad,
      "Subtotal ($)": item.monto
    }));

    datosExcel.push({
      "Mes/Año": "Total",
      "Producto": "",
      "Cantidad": totalProductos,
      "Subtotal ($)": totalMonto
    });

    const hoja = XLSX.utils.json_to_sheet(datosExcel);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Productos Vendidos");
    XLSX.writeFile(libro, "Productos_Ingresados.xlsx");
  };

  return (
    <div className="cuadro-container">
      <h2 className="cuadro-titulo">Ventas realizadas</h2>

      <div className="filtros-container">
        <div className="inputs-filtros">
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

        <div className="exportar-btn-container">
          <button className="exportar-btn" onClick={exportarExcel}>
            Exportar a Excel
          </button>
        </div>
      </div>

      <div className="grafico-wrapper">
        <ResponsiveContainer>
          <BarChart data={graficoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mesAnio" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h4 className="titulos">📦 Detalle por producto</h4>
      <div className="tabla-wrapper">
        <table>
          <thead>
            <tr>
              <th>Mes/Año</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Subtotal ($)</th>
            </tr>
          </thead>
          <tbody>
            {graficoData.length === 0 ? (
              <tr>
                <td colSpan={4}>No hay datos para mostrar</td>
              </tr>
            ) : (
              graficoData.map((item, index) => (
                <tr key={index}>
                  <td>{item.mesAnio}</td>
                  <td>{item.nombre_producto}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.monto.toLocaleString('es-AR')}</td>
                </tr>
              ))
            )}
            {graficoData.length > 0 && (
              <tr>
                <td><strong>TOTAL</strong></td>
                <td></td>
                <td><strong>{totalProductos}</strong></td>
                <td><strong>${totalMonto.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</strong></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CuadroProductosIngresados;
