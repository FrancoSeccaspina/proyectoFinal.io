import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validationRegister = [
    body('email')
        .notEmpty().withMessage('E-Mail no puede quedar vacío')
        .bail()
        .isEmail().withMessage('Debe ingresar un email válido'),

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

    body('nombre')
        .notEmpty().withMessage('El nombre de usuario no puede quedar vacío')
        .bail()
        .isLength({ min: 3, max: 20 }).withMessage('El nombre debe tener entre 3 y 20 caracteres'),

    body('apellido')
        .notEmpty().withMessage('El apellido de usuario no puede quedar vacío')
        .bail()
        .isLength({ min: 4 }).withMessage('El apellido debe tener al menos 4 caracteres'),

    body('dni')
        .notEmpty().withMessage('El DNI no puede quedar vacío')
        .bail()
        .isLength({ min: 7, max: 8 }).withMessage('El DNI debe tener 7 u 8 dígitos')
        .isNumeric().withMessage('El DNI debe contener solo números'),

    body('celular')
        .notEmpty().withMessage('El número de teléfono no puede quedar vacío')
        .bail()
        .matches(/^[0-9\s\-+()]{7,15}$/)
        .withMessage('Debe ingresar un teléfono válido'),

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
