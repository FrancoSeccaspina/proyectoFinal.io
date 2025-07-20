export const estadoCuota = (cuotas) => {
  const hoy = new Date();

  return cuotas.map(cuota => {
    if (!cuota.fecha) return cuota; 

    const fechaPago = new Date(cuota.fecha);
    const proximoVencimiento = new Date(fechaPago);
    proximoVencimiento.setMonth(proximoVencimiento.getMonth() + 1);

    let nuevoEstado = cuota.estado;

    if (cuota.faltante === 0 && hoy < proximoVencimiento) {
      nuevoEstado = 'PAGADA';
    }

    if (hoy >= proximoVencimiento) {
      nuevoEstado = 'VENCIDA';
    }

    return {
      ...cuota,
      estado: nuevoEstado
    };
  });
};
