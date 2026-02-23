import { Request, Response, NextFunction } from 'express';
import { obtenerPayload } from '../utils/generadorToken';
import { IS_PRODUCTION } from '../configEnv';


/**
 * Middleware que verifica la validez del token JWT y los permisos de rol para acceder a una ruta.
 * 
 * @param {string[]} rolesPermitidos - Array de roles permitidos que pueden acceder a la ruta.
 * @returns {Function} Middleware Express que valida el token, verifica el rol y controla el acceso.
 * 
 * Comportamiento:
 * - Si no se proporciona un token, responde con 401 (No autorizado).
 * - Si el token es inválido o caducado, responde con 401 y elimina la cookie del token.
 * - Si el usuario no posee un rol permitido, responde con 403 (Prohibido).
 * - Si todo es válido, agrega el usuario a la sesión y llama a `next()`.
 */
export const verificarTokenPorRol = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    
    const token = req.cookies?.token;
    if (!token) {
      console.warn(`Acceso denegado: Token no proporcionado. Ruta: ${req.originalUrl}.`);
      res.clearCookie('token', {
          httpOnly: true,
          secure: IS_PRODUCTION,
          sameSite: IS_PRODUCTION ? 'strict' : 'lax'
        });
      res.status(401).render("login", {
        mostrarModal: true,
        modalTitle: "Sesion invalida o expirada",
        modalMessage: "Tu sesion ya no es valida o el enlace ha vencido."
      });
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
