// frontend/src/utils/calcularMontoActual.js
export const calcularMontoActual = (fechaInicio) => {
  const baseMonto = 20000;
  const fechaBase = new Date(fechaInicio);
  const hoy = new Date();

  const mesesPasados =
    (hoy.getFullYear() - fechaBase.getFullYear()) * 12 +
    (hoy.getMonth() - fechaBase.getMonth());

  const aumentos = Math.floor(mesesPasados / 3);

  const monto = baseMonto + aumentos * 2000;

  return monto;
};
