import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validationRegister = [

    body('contrasenia')
        .notEmpty().withMessage('Por favor, ingrese su contraseña')
        .bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
        .matches(/[^A-Za-z0-9]/).withMessage('La contraseña debe contener al menos un carácter especial'),

    body('confirmar_contrasenia')
        .notEmpty().withMessage('Debe confirmar su contraseña')
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.contrasenia) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),

    (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const { token } = req.params;
        return res.status(400).render("changePassword", {
        errors: errors.mapped(),
        oldData: req.body,
        token
        });
    }
    next();
    }
];

export default validationRegister;
