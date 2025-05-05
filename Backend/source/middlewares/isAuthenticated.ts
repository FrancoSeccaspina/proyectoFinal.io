import { NextFunction, Request, Response } from "express";
import session from "express-session";

declare module "express-session" {
    interface SessionData {
        user?: any; // Ajusta el tipo de 'user' según sea necesario
    }
}

function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

/**
 * Middleware que verifica si hay un usuario logueado en la sesión.
 * Si el usuario está logueado, establece `res.locals.usuarioLogueado` en `true`.
 * Si no hay un usuario en la sesión, establece `res.locals.usuarioLogueado` en `false`.
 *
 */
function setUsuarioLogueado(req: Request, res: Response, next: NextFunction): void {
    res.locals.usuarioLogueado = !!req.session.usuario;
    next();
}

export default { isAuthenticated, setUsuarioLogueado };