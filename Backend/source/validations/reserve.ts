import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validationReserve = [
    body('email')
        .notEmpty().withMessage('E-Mail no puede quedar vacío')
        .bail()
        .isEmail().withMessage('Debe ingresar un email válido')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    body('confirmar_email')
        .notEmpty().withMessage('Debe confirmar su email')
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.email) {
                throw new Error('Los correos electronicos no coinciden');
            }
            return true;
        }),

    (req: Request, res: Response, next: NextFunction): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            (req as any).validationErrors = errors.mapped();
        }
        next();
    }
];

export default validationReserve;