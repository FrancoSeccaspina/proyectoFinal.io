import React, { useState, useEffect } from 'react';
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

  // Obtener datos de la API
  const showData = async () => {
    try {
      const response = await fetch("http://localhost:3032/api/gestionPagoProveedores", {
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

    const actualizado = {
      ...pendiente,
      [tipo]: parseFloat(valor)
    };

    setPendiente(actualizado);
    if (actualizado.ingreso !== null && actualizado.cobro !== null) {
      const sobrante = actualizado.ingreso - actualizado.cobro;

      const nuevoRegistro = {
        ingreso: actualizado.ingreso,
        egreso: actualizado.cobro,
        sobrante: sobrante,
        fecha: new Date().toISOString()
      };

      enviarRegistro(nuevoRegistro);

      // Limpiar estados
      setNuevoIngreso('');
      setNuevoCobro('');
      setPendiente({ ingreso: null, cobro: null });
    }

    if (tipo === 'ingreso') setNuevoIngreso('');
    if (tipo === 'cobro') setNuevoCobro('');
  };

  // Enviar al backend
  const enviarRegistro = async (registro) => {
    try {
      await fetch("http://localhost:3032/api/gestionPagoProveedores", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registro)
      });

      // Refrescar la tabla después del envío
      showData();
    } catch (error) {
      console.error('Error al agregar registro:', error);
    }
  };

  // Totales
  const totalIngresado = resumen.reduce((acc, item) => acc + item.ingreso, 0);
  const totalEgresado = resumen.reduce((acc, item) => acc + item.egreso, 0);
  const totalSobrante = resumen.reduce((acc, item) => acc + item.sobrante, 0); 

  const dataGrafico = [
    { nombre: 'Ingresado', monto: totalIngresado },
    { nombre: 'Egresado', monto: totalEgresado },
    { nombre: 'Sobrante', monto: totalSobrante }
  ];

  return (
    <div className="cuadro-container">
      <h2>Cuadro Ingreso y Egreso a Proveedores</h2>

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
            <Area
              type="monotone"
              dataKey="monto"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorMonto)"
            />
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