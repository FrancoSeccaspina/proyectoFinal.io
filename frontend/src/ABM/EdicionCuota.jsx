import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EdicionCuota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cuota, setCuota] = useState({
    fecha: '',
    descripcion: '',
    monto: '',
    pagado: '',
    estado: '',
    sobrante: '',
    faltante: '',
    nuevoIngreso: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3032/api/cuotas/${id}`, { withCredentials: true })
      .then((res) => setCuota(res.data))
      .catch((err) => console.error('Error al cargar cuotas:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuota((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoIngreso = parseFloat(cuota.nuevoIngreso) || 0;
    const pagadoActual = parseFloat(cuota.pagado) || 0;
    const faltanteActual = parseFloat(cuota.faltante) || 0;
    const sobranteActual = parseFloat(cuota.sobrante) || 0;

    // 🔢 Total pagado que se debe persistir (para que en la tabla aparezca la suma)
    const pagadoConIngreso = pagadoActual + nuevoIngreso;

    let nuevoFaltante = faltanteActual;
    let nuevoSobrante = sobranteActual;
    let nuevoEstado = cuota.estado;

    if (nuevoIngreso === faltanteActual) {
      // Paga lo justo
      nuevoEstado = 'ACTIVO';
      nuevoFaltante = 0;
    } else if (nuevoIngreso < faltanteActual) {
      // Paga menos
      nuevoEstado = 'PENDIENTE';
      nuevoFaltante = faltanteActual - nuevoIngreso;
    } else {
      // Paga de más
      nuevoEstado = 'ACTIVO';
      nuevoSobrante = sobranteActual + (nuevoIngreso - faltanteActual);
      nuevoFaltante = 0;
    }

    const cuotaActualizada = {
      ...cuota,
      pagado: pagadoConIngreso,   // ✅ guardamos la suma (pagado + nuevoIngreso)
      faltante: nuevoFaltante,
      sobrante: nuevoSobrante,
      estado: nuevoEstado,
      nuevoIngreso: '',           // limpiar el campo
    };

    axios
      .put(`http://localhost:3032/api/editarCuota/${id}`, cuotaActualizada, {
        withCredentials: true,
      })
      .then(() => {
        console.log('Cuota actualizada');
        navigate('/Usuarios');
      })
      .catch((err) => console.error('Error al editar:', err));
  };

  // 👀 Vista previa en pantalla del total pagado (no se edita, solo muestra)
  const pagadoConIngresoPreview =
    (parseFloat(cuota.pagado) || 0) + (parseFloat(cuota.nuevoIngreso) || 0);

  return (
    <div className='contenedor'>
      <h2>Editar Cuota</h2>
      <form onSubmit={handleSubmit} className='formulario'>
        <label>Precio de la Cuota</label>
        <input
          type="number"
          name="monto"
          value={cuota.monto}
          readOnly
        />

        <label>Cliente pagó (actual)</label>
        <input
          type="number"
          name="pagado"
          value={cuota.pagado}
          readOnly
        />

        <label>Falta Abonar (actual)</label>
        <input
          type="number"
          name="faltante"
          value={cuota.faltante}
          readOnly
        />

        <label>Nuevo Ingreso</label>
        <input
          type="number"
          name="nuevoIngreso"
          value={cuota.nuevoIngreso}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />

        {/* Vista previa del total que quedará guardado */}
        <label>Pagado con este ingreso (vista previa)</label>
        <input
          type="number"
          value={Number.isFinite(pagadoConIngresoPreview) ? pagadoConIngresoPreview : 0}
          readOnly
        />

        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={cuota.descripcion}
          onChange={handleChange}
          required
        />

        <label>Estado</label>
        <textarea
          name="estado"
          value={cuota.estado}
          onChange={handleChange}
          required
        />

        <div className="acomodar">
          <button type="submit" className='boton'>Guardar Cambios</button>
          <button type="button" className='atras'>
            <a href="/Usuarios">Volver</a>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EdicionCuota;
