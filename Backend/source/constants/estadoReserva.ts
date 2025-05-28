/**
 * Enum que define los roles disponibles en la aplicación.
 * 
 * @enum {string}
 * @property {string} PENDIENTE
 * @property {string} CONFIRMADA
 * @property {string} CANCELADA
 * @example
 * // Acceder a los valores del enum
 * const pendienteReserva = EstadosReserva.PENDIENTE; // 'pendiente'
 * const confirmadaReserva = EstadosReserva.CONFIRMADA; // 'confirmada'
 * const canceladaReserva = EstadosReserva.CANCELADA; // 'cancelada'    
 */
export enum EstadosReserva {
    PENDIENTE = 'pendiente',
    CONFIRMADO = 'confirmado',
    CANCELADO = 'cancelado',
  }
  