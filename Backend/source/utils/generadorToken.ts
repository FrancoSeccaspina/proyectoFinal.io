import { JWT_SECRET } from '../configEnv';
const jwt = require('jsonwebtoken')

interface UsuarioToken {
    id: number;
    nombre: string;
    rol: string;
}

export function firmarToken (usuario: UsuarioToken, expiracion:string) {
    const token = jwt.sign(usuario, JWT_SECRET, { expiresIn: expiracion });
    return token;
}

export function obtenerPayload(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET!);
    return payload;

  } catch (error) {
    console.error('Token inválido o expirado');
    return null;
  }
}
