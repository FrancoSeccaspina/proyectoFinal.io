import { Request, Response } from 'express';
import { Ejercicio } from '../database/models/ejercicio';
import { error } from 'console';

export class EjercicioController {

    async listaEjercicios(req: Request, res: Response): Promise<Response> {
        try {
            const ejercicios = await Ejercicio.findAll();
            if (ejercicios.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Ejercicios encontrados",
                    ejercicios,
                });
            }
            return res.status(404).json({
                success: false,
                message: "No se encontraron ejercicios",
            });
        } catch (error) {
            console.error('Error al listar ejercicos:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
            });
        }
    }

    async listaEjerciciosPorGrupoMuscular(req: Request, res: Response): Promise<void> {
        try {
            const grupoMuscularId = req.params.id;
            const ejercicios = await Ejercicio.findAll({
                where: {
                    grupo_muscular_id: grupoMuscularId,
                },
            });
    
            if (ejercicios.length === 0) {
                return res.render('rutinasDetails', {
                    errors: { msg: "No se encontraron ejercicios para este grupo muscular" },
                    ejercicios,
                    grupoMuscularId,
                    success: false,
                });
            }

            res.render('rutinasDetails', {
                ejercicios,
                grupoMuscularId,
                errors: undefined,
                success: true,
            });

        } catch (error) {
            console.error('Error al listar ejercicios:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
            });
        }
    }
}

export default new EjercicioController();