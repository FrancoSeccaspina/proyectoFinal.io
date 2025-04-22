import { Request, Response } from 'express';
import { Ejercicio } from '../database/models/ejercicio';
import { error } from 'console';
import { RelationshipType } from 'sequelize/types/errors/database/foreign-key-constraint-error';
import { where } from 'sequelize';

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
    async crearEjercicio(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, descripcion, grupo_muscular_id, video, titulo } = req.body;
            if (!nombre || !descripcion || !descripcion || !grupo_muscular_id || !video || !titulo) {
                return res.status(400).json({ success: false, message: "Faltan datos requeridos", });
            }
            const nuevoEjercicio = await Ejercicio.create({
                nombre,
                descripcion,
                grupo_muscular_id,
                video,
                titulo
            });
            return res.status(201).json({
                success: true,
                message: "Ejercicio creado con exito",
                ejercicio: nuevoEjercicio,
            });
        } catch (error) {
            console.error("Error en el crearEjercicio:", (error as Error).message);
            return res.status(500).json({ success: false, message: "Error interno en el servidor" });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const ejercicio = await Ejercicio.findOne({ where: { id } });

            if (!ejercicio) {
                return res.status(404).json({
                    success: false,
                    message: "Ejercicio no encontrado"
                })
            }
            await ejercicio.destroy();
            return res.status(200).json({
                success: true,
                message: "ejercicio eliminado con éxito",
            });
        } catch (error) {
            console.error("Error en deleteEjercicio:", (error as Error).message);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
    async editarEjercicio(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const ejercicio = await Ejercicio.findOne({ where: { id } });

            if (!ejercicio) {
                return res.status(404).json({ success: true, message: "ejercicio eliminado con éxito", })
            }
            await ejercicio.update(req.body)
            return res.status(200).json({
                success: true,
                message: "Ejercicio editado correctamente",
                ejercicio: ejercicio,
            })
        } catch (error) {
            console.error("Error en editarEjercicio:", (error as Error).message);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
}

export default new EjercicioController();