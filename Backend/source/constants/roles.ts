/**
 * Enum que define los roles disponibles en la aplicación.
 * 
 * @enum {string}
 * @property {string} ADMIN
 * @property {string} CLIENTE
 * @property {string} INVITADO
 * @example
 * // Acceder a los valores del enum
 * const adminRole = Roles.ADMIN; // 'admin'
 * const clienteRole = Roles.CLIENTE; // 'cliente'
 * const invitadoRole = Roles.INVITADO; // 'invitado'
 */
export enum Roles {
    ADMIN = 'admin',
    CLIENTE = 'cliente',
    INVITADO = 'invitado',
  }
  