import e, { NextFunction } from "express";
import { Request, Response } from "express";
import session from "express-session";

declare module "express-session" {
    interface SessionData {
        user?: any; // Adjust the type of 'user' as needed
    }
}

function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }

}

export default isAuthenticated;