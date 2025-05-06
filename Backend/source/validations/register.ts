import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validationRegister = [
    body('email')
        .notEmpty()
        .withMessage('E-Mail no puede quedar vacio')
        .bail()
        .isEmail()
        .withMessage('Debe ingresar un email válido'),

    body('contrasenia')
        .notEmpty()
        .withMessage('Por favor, ingrese su contraseña')
        .bail()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),

    body('nombre')
        .notEmpty()
        .withMessage('El nombre de usuario no puede quedar vacío')
        .bail()
        .isLength({ min: 3, max: 20 })
        .withMessage('El nombre debe tener entre 3 y 20 caracteres'),

    body('apellido')
        .notEmpty()
        .withMessage('El apellido de usuario no puede quedar vacío')
        .bail()
        .isLength({ min: 4 })
        .withMessage('El apellido debe tener al menos 4 caracteres'),

    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("register", {
                errors: errors.mapped(),
                oldData: req.body
            });
        }
        next();
    }
];

export default validationRegister;