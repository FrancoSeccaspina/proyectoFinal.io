/**
 * Enum que define los roles disponibles en la aplicación.
 * 
 * @enum {string}
 * @property {string} PENDIENTE
 * @property {string} CONFIRMADO
 * @property {string} CANCELADO
 * @property {string} EXPIRADO
 * @example
 * // Acceder a los valores del enum
 * const pendienteReserva = EstadosReserva.PENDIENTE; // 'pendiente'
 * const confirmadaReserva = EstadosReserva.CONFIRMADO; // 'confirmado'
 * const canceladaReserva = EstadosReserva.CANCELADO; // 'cancelado'    
 */
export const EstadosReserva = {
  PENDIENTE: 'pendiente',
  CONFIRMADO: 'confirmado',
  CANCELADO: 'cancelado',
  EXPIRADO: 'expirado'
};