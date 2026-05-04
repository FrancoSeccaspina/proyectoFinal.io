import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import '../css/CuadroIngresoCobro.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const CuadroIngresoCobro = () => {
  const [resumen, setResumen] = useState([]);
  const [nuevoIngreso, setNuevoIngreso] = useState('');
  const [nuevoCobro, setNuevoCobro] = useState('');
  const [pendiente, setPendiente] = useState({ ingreso: null, cobro: null });

  const showData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/pagos-proveedores`, {
        credentials: 'include'
      });
      const data = await response.json();
      setResumen(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  const manejarIngreso = (tipo) => {
    const valor = tipo === 'ingreso' ? nuevoIngreso : nuevoCobro;
    if (!valor) return;

    const actualizado = { ...pendiente, [tipo]: parseFloat(valor) };
    setPendiente(actualizado);

    if (actualizado.ingreso !== null && actualizado.cobro !== null) {
      const sobrante = actualizado.ingreso - actualizado.cobro;

      const nuevoRegistro = {
        ingreso: actualizado.ingreso,
        egreso: actualizado.cobro,
        sobrante,
        fecha: new Date().toISOString()
      };

      enviarRegistro(nuevoRegistro);
      setNuevoIngreso('');
      setNuevoCobro('');
      setPendiente({ ingreso: null, cobro: null });
    }

    if (tipo === 'ingreso') setNuevoIngreso('');
    if (tipo === 'cobro') setNuevoCobro('');
  };

  const enviarRegistro = async (registro) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/api/pagos-proveedores`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registro)
      });
      showData();
    } catch (error) {
      console.error('Error al agregar registro:', error);
    }
  };

  const totalIngresado = resumen.reduce((acc, item) => acc + item.ingreso, 0);
  const totalEgresado = resumen.reduce((acc, item) => acc + item.egreso, 0);
  const totalSobrante = resumen.reduce((acc, item) => acc + item.sobrante, 0);

  const dataGrafico = [
    { nombre: 'Ingresado', monto: totalIngresado },
    { nombre: 'Egresado', monto: totalEgresado },
    { nombre: 'Sobrante', monto: totalSobrante }
  ];

  // Función para exportar a Excel con formato
const exportarExcel = () => {
  if (!resumen.length) return; // Evitar exportar si no hay datos

  const datosExcel = resumen.map(item => ({
    "Fecha": new Date(item.fecha).toLocaleDateString('es-AR'),
    "Ingreso": item.ingreso.toFixed(2), 
    "Egreso": item.egreso.toFixed(2),
    "Sobrante": item.sobrante.toFixed(2)
  }));

  // Agregar fila de totales
  datosExcel.push({
    "Fecha": "Total",
    "Ingreso": totalIngresado.toFixed(2),
    "Egreso": totalEgresado.toFixed(2),
    "Sobrante": totalSobrante.toFixed(2)
  });

  // Crear hoja y libro Excel
  const hoja = XLSX.utils.json_to_sheet(datosExcel);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Resumen Ingreso y Cobro");
  XLSX.writeFile(libro, "IngresoEgreso_Provedores.xlsx");
};


  return (
    <div className="cuadro-container">
      <h2 className="cuadro-titulo">Cuadro Ingreso y Egreso a Proveedores</h2>

      <div className="formulario">
        <div className="campo">
          <h4>Ingreso Plata</h4>
          <input
            type="number"
            value={nuevoIngreso}
            onChange={(e) => setNuevoIngreso(e.target.value)}
            placeholder="Monto ingreso"
          />
          <button className="btn-ingreso" onClick={() => manejarIngreso('ingreso')}>Cargar Ingreso</button>
        </div>

        <div className="campo">
          <h4>Ingreso Cobro</h4>
          <input
            type="number"
            value={nuevoCobro}
            onChange={(e) => setNuevoCobro(e.target.value)}
            placeholder="Monto cobro"
          />
          <button className="btn-cobro" onClick={() => manejarIngreso('cobro')}>Cargar Cobro</button>
        </div>
      </div>

      {/* Botón Exportar */}
      <div className="exportar-btn-container">
        <button className="exportar-btn" onClick={exportarExcel}>
          Exportar a Excel
        </button>
      </div>

      <div className="grafico">
        <h4>Gráfico de Estado Financiero</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dataGrafico}>
            <defs>
              <linearGradient id="colorMonto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Area type="monotone" dataKey="monto" stroke="#8884d8" fillOpacity={1} fill="url(#colorMonto)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="resumen">
        <h4>Resumen por Fecha</h4>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Ingreso</th>
              <th>Egreso</th>
              <th>Sobrante</th>
            </tr>
          </thead>
          <tbody>
            {resumen.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.fecha).toLocaleDateString('es-AR')}</td>
                <td>${item.ingreso.toFixed(2)}</td>
                <td>${item.egreso.toFixed(2)}</td>
                <td>${item.sobrante.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CuadroIngresoCobro;
