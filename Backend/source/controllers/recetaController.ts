import { Request, Response } from 'express';
import { Receta } from '../database/models/receta';


export class RecetaController {
    async listaReceta(req: Request, res: Response): Promise<void> {
        try {
            const recetas = await Receta.findAll();
            if (recetas.length > 0) {
                res.render("recetas", { recetas });
            }
            res.status(404).json({
                success: false,
                message: "No se encontraron recetas",
            });
        } catch (error) {
            console.error("Error en listaRecetas:", (error as Error).message);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
    async mostrarPorCategoria(req: Request, res: Response): Promise<void> {
        try {
            const categoriaId = req.params.id;
            if (!categoriaId) {
                res.status(400).json({
                    success: false,
                    message: "ID de categoría no proporcionado",
                });
            }
            const recetas = await Receta.findAll({
                where: { categoriaId: categoriaId },
            });
            if (recetas.length > 0) {
                res.render("recetas", { recetas });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No se encontraron recetas para esta categoría",
                });
            }


        } catch (error) {
            console.error("Error en listaRecetas:", (error as Error).message);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
    async mostrarPorId(req: Request, res: Response): Promise<void> {
        try {
            const receta = await Receta.findOne({
                where: { id: req.params.id },
            });
            if (receta) {
                res.render("receta", { receta });
            }
            res.status(404).json({
                success: false,
                message: "Receta no encontrada",
            })
        } catch (error) {
            console.error("Error en listaRecetas:", (error as Error).message);
            res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            })
        }
    }
}
export default new RecetaController();