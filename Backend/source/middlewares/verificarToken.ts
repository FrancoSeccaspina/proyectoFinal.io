import { Request, Response, NextFunction } from 'express';
import { obtenerPayload } from '../utils/generadorToken';

export const verificarTokenPorRol = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    
    const token = req.cookies?.token;

    if (!token) {
      console.warn(`Acceso denegado: Token no proporcionado. Ruta: ${req.originalUrl}.`);
      res.status(401).json({ mensaje: 'No se ha proporcionado el token de autenticación.' });
      return 
    }

    const payload = obtenerPayload(token);

    if (!payload) {
      console.error(`Token inválido recibido. Ruta: ${req.originalUrl}s`);
      res.clearCookie('token');
      res.status(401).json({ mensaje: 'Token inválido o caducado.' });
      return 
    }

    if (!rolesPermitidos.includes(payload.rol)) {
      console.warn(`Acceso denegado: No tiene permisos suficientes para acceder a esta ruta. (${payload.rol}). Ruta: ${req.originalUrl}.`);
      res.status(403).json({ mensaje: 'No tiene permisos suficientes para acceder a esta ruta.' });
      return 
    }

    req.session.usuario = {
      id: payload.id,
      nombre: payload.nombre,
      rol: payload.rol
    };

    next();
  };
};
