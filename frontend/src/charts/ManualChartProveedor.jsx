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
  const [ingresos, setIngresos] = useState([]);
  const [cobros, setCobros] = useState([]);
  const [nuevoIngreso, setNuevoIngreso] = useState('');
  const [nuevoCobro, setNuevoCobro] = useState('');

  useEffect(() => {
    const ingresosGuardados = JSON.parse(localStorage.getItem('ingresos') || '[]');
    const cobrosGuardados = JSON.parse(localStorage.getItem('cobros') || '[]');
    setIngresos(ingresosGuardados);
    setCobros(cobrosGuardados);
  }, []);

  useEffect(() => {
    localStorage.setItem('ingresos', JSON.stringify(ingresos));
  }, [ingresos]);

  useEffect(() => {
    localStorage.setItem('cobros', JSON.stringify(cobros));
  }, [cobros]);

  const agregarIngreso = () => {
    const monto = parseFloat(nuevoIngreso);
    if (!isNaN(monto) && monto > 0) {
      setIngresos([...ingresos, monto]);
      setNuevoIngreso('');
    }
  };

  const agregarCobro = () => {
    const monto = parseFloat(nuevoCobro);
    if (!isNaN(monto) && monto > 0) {
      setCobros([...cobros, monto]);
      setNuevoCobro('');
    }
  };

  const totalIngresado = ingresos.reduce((acc, val) => acc + val, 0);
  const totalCobrado = cobros.reduce((acc, val) => acc + val, 0);
  const sobrante = totalIngresado - totalCobrado;

  const dataGrafico = [
    { nombre: 'Ingresado', monto: totalIngresado },
    { nombre: 'Cobrado', monto: totalCobrado },
    { nombre: 'Sobrante', monto: sobrante },
  ];

  return (
    <div className="cuadro-container">
      <h2>Cuadro Ingreso y Cobro a Proveedores</h2>

      <div className="formulario">
        <div className="campo">
          <h4>Agregar Ingreso</h4>
          <input
            type="number"
            value={nuevoIngreso}
            onChange={(e) => setNuevoIngreso(e.target.value)}
            placeholder="Monto ingreso"
          />
          <button className="btn-ingreso" onClick={agregarIngreso}>Agregar</button>
        </div>

        <div className="campo">
          <h4>Agregar Cobro</h4>
          <input
            type="number"
            value={nuevoCobro}
            onChange={(e) => setNuevoCobro(e.target.value)}
            placeholder="Monto cobro"
          />
          <button className="btn-cobro" onClick={agregarCobro}>Agregar</button>
        </div>
      </div>

      <div className="grafico">
        <h4>Gráfico de Estado Financiero</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dataGrafico}>
            <defs>
              <linearGradient id="colorMonto" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
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
        <h4>Resumen</h4>
        <table>
          <thead>
            <tr>
              <th>Total Ingresado</th>
              <th>Total Cobrado</th>
              <th>Sobrante</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${totalIngresado.toFixed(2)}</td>
              <td>${totalCobrado.toFixed(2)}</td>
              <td>${sobrante.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CuadroIngresoCobro;