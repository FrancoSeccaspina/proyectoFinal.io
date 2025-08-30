import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const ENTORNO = process.env.NODE_ENV;

export const SESSION_PASSWORD = process.env.SESSION_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER_CONECT = process.env.DATABASE_USER_CONECT;
export const DATABASE_PASSWORD_CONECT = process.env.DATABASE_PASSWORD_CONECT;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const TIEMPO_CONTROL_STOCK_MINUTOS = process.env.TIEMPO_CONTROL_STOCK_MINUTOS;
export const JWT_SECRET = process.env.JWT_SECRET;
export const BACKEND_APP_DOMAIN_HOST = process.env.BACKEND_APP_DOMAIN_HOST;
export const REACT_APP_DOMAIN_HOST = process.env.REACT_APP_DOMAIN_HOST;

export function validarVariablesDeEntorno() {
  const variablesRequeridas = [
    'SESSION_PASSWORD',
    'DATABASE_NAME',
    'DATABASE_USER_CONECT',
    'DATABASE_HOST',
    'TIEMPO_CONTROL_STOCK_MINUTOS',
    'JWT_SECRET',
    'BACKEND_APP_DOMAIN_HOST'
  ];

  const variablesNoDefinidas = variablesRequeridas.filter(
    (v) => !process.env[v]
  );

  if (variablesNoDefinidas.length > 0) {
    throw new Error(
      `Faltan variables de entorno obligatorias: ${variablesNoDefinidas.join(', ')}`
    );
  }
}
