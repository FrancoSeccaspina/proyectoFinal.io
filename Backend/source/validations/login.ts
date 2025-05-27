import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validationLogin = [
    body('email')
        .notEmpty()
        .withMessage('El email no puede quedar vacío')
        .bail()
        .isEmail()
        .withMessage('Debe ingresar un email válido'),

    body('contrasenia')
        .notEmpty()
        .withMessage('La contraseña no puede quedar vacía'),

    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("login", {
                errors: errors.mapped(),
                oldData: req.body
            });
        }
        next();
    }
];

export default validationLogin;
