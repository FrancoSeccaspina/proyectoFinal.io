import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const ENTORNO = process.env.NODE_ENV;

export const SESSION_PASSWORD = process.env.SESSION_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const TIEMPO_CONTROL_STOCK_MINUTOS = process.env.TIEMPO_CONTROL_STOCK_MINUTOS;
export const JWT_SECRET = process.env.JWT_SECRET;

export function validarVariablesDeEntorno() {
  const variablesRequeridas = [
    'JWT_SECRET',
    'SESSION_PASSWORD',
    'DATABASE_NAME',
    'DATABASE_PASSWORD',
    'DATABASE_USER',
    'DATABASE_HOST',
    'TIEMPO_CONTROL_STOCK_MINUTOS',
    'JWT_SECRET',
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
