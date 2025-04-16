import { Request, Response } from 'express';
import { Ejercicio } from '../database/models/ejercicio';

export class ejercicioController {

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

    // Listar ejercicios por grupo muscular
    async listaEjerciciosPorGM(req: Request, res: Response): Promise<Response> {
        try {
            const grupoMuscularId = req.params.id;
            const ejercicios = await Ejercicio.findAll({
                where: {
                    grupo_muscular_id_fk: grupoMuscularId,
                },
            });
            if (ejercicios.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Ejercicios encontrados",
                    ejercicios,
                });
            }
            return res.status(404).json({
                success: false,
                message: "No se encontraron ejercicios para este grupo muscular",
            });
        } catch (error) {
            console.error('Error al listar ejercicos:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
            });
        }
    }
}