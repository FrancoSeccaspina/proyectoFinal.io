import { Request, Response } from 'express';
import { Receta } from '../database/models/receta';


export class RecetaController {
    async mostrarTodo(req: Request, res: Response): Promise<Response> {
        try {
            const recetas = await Receta.findAll();
            if (recetas.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Recetas encontradas",
                    recetas,
                });
            }
            return res.status(404).json({
                success: false,
                message: "No se encontraron recetas",
            });
        } catch (error) {
            console.error("Error en listaRecetas:", (error as Error).message);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
    async mostrarPorCategoria(req: Request, res: Response): Promise<Response> {
        try {
            const recetas = await Receta.findAll({
                where: { categoria_id_fk: req.params.id },
            });
            if (recetas.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Recetas encontradas",
                    recetas,
                });
            }
            return res.status(404).json({
                success: false,
                message: "No se encontraron recetas",
            });
        } catch (error) {
            console.error("Error en listaRecetas:", (error as Error).message);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
    async mostrarPorId(req: Request, res: Response): Promise<Response> {
        try {
            const receta = await Receta.findOne({
                where: { id: req.params.id },
            });
            if (receta) {
                return res.status(200).json({
                    success: true,
                    message: "Receta encontrada",
                    receta,
                });
            }
            return res.status(404).json({
                success: false,
                message: "Receta no encontrada",
            });
        } catch (error) {
            console.error("Error en listaRecetas:", (error as Error).message);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
}
export default new RecetaController();