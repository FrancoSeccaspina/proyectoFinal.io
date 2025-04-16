import { Request, Response } from 'express';
import { GrupoMuscular } from '../database/models/grupos_musculares';

export class grupoMuscularController {
    async listaGrupoMuscular(req: Request, res: Response): Promise<Response> {
        try {
            const gruposMusculares = await GrupoMuscular.findAll();
            if (gruposMusculares.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Grupos Musculares encontrados",
                    gruposMusculares,
                });
            }
            return res.status(404).json({
                success: false,
                message: "No se encontraron Grupos Musculares",
            });
        } catch (error) {
            console.error('Error al listar Grupos Musculares:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
            });
        }
    }
    async getIdPorNombre(req: Request, res: Response): Promise<Response> {
        try {
            const nombre = req.params.nombre;
            const grupoMuscular = await GrupoMuscular.findOne({
                where: {
                    nombre: nombre,
                },
            });
            if (grupoMuscular) {
                return res.status(200).json({
                    success: true,
                    message: "Grupo Muscular encontrado",
                    grupoMuscular,
                });
            }
            return res.status(404).json({
                success: false,
                message: "No se encontró el Grupo Muscular",
            });
        } catch (error) {
            console.error('Error al listar Grupos Musculares:', error);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
            });
        }
    }
}

export default new grupoMuscularController();