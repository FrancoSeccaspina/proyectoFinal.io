import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const PORT = process.env.PORT;
export const ENTORNO = process.env.NODE_ENV;
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const SESSION_PASSWORD = process.env.SESSION_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306;
export const TIEMPO_CONTROL_STOCK_MINUTOS = process.env.TIEMPO_CONTROL_STOCK_MINUTOS;
export const JWT_SECRET = process.env.JWT_SECRET;
export const REACT_APP_FRONTEND_DOMAIN_HOST = process.env.REACT_APP_FRONTEND_DOMAIN_HOST;
export const REACT_APP_BACKEND_DOMAIN_HOST = process.env.REACT_APP_BACKEND_DOMAIN_HOST;

export function validarVariablesDeEntorno() {
  const variablesRequeridas = [
    'SESSION_PASSWORD',
    'DATABASE_NAME',
    'DATABASE_USER',
    'DATABASE_PASSWORD',
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
