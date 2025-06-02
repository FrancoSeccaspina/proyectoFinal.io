export const calcularMontoActual = (fechaInicio: string | Date): number => {
  const fechaBase = new Date(fechaInicio);
  const hoy = new Date();

  const mesesPasados =
    (hoy.getFullYear() - fechaBase.getFullYear()) * 12 +
    (hoy.getMonth() - fechaBase.getMonth());

  let monto = 20000;

  const aumentos = Math.floor(mesesPasados / 3);
  const descuentos = Math.floor(mesesPasados / 2);

  monto += aumentos * 2000;
  monto -= descuentos * 2000;

  // Asegurar que el monto no sea menor a 0
  return Math.max(monto, 0);
};
