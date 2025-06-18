/**
 * Enum define los tipos de transacciones disponibles en la aplicación.
 * 
 * @enum {string}
 * @property {string} INGRESO
 * @property {string} EGRESO
 * 
 */
export enum TipoTransaccion {
    INGRESO = 'ingreso',
    EGRESO = 'egreso',
}

/** * Enum define los orígenes de las transacciones disponibles en la aplicación.
 *
 * @enum {string}
 *  @property {string} RESERVA - Representa una transacción originada por una reserva.
 *  @property {string} CUOTA - Representa una transacción originada por una cuota.
 *
 */
export enum OrigenTransaccion {
    CARRITO = 'carrito',
    CUOTA = 'cuota',
}