import { Request, Response, NextFunction } from 'express';
import { obtenerPayload } from '../utils/generadorToken';

export const autenticarToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ mensaje: 'No se ha proporcionado el token de autenticación.' });
    return;
  }

  const payload = obtenerPayload(token);
  if (!payload) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }

  req.session.usuario = {
    id: payload.id,
    nombre: payload.nombre,
    rol: payload.rol
  };
  next();

};