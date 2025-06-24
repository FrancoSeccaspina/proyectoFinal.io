import { JWT_SECRET } from '../configEnv';
const jwt = require('jsonwebtoken')

interface UserToken {
    id: number;
    nombre: string;
    rol: string;
}

export function firmarToken (user: UserToken) {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "2h" });
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
