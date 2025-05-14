import { Request, Response } from 'express';
import { Receta } from '../database/models/receta';
import { error } from 'console';


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
                res.render("recetaDetail", { recetas });
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
    async crearReceta(req: Request, res: Response): Promise<Response> {
        try {
<<<<<<< HEAD
            const { nombre, descripcion, categoriaId, imagen } = req.body;
=======
            const { nombre, descripcion, categoriaId, imagen} = req.body;
>>>>>>> 91e82696598ce8eaa40fa19497247a043c3a1287
            if (!nombre || !descripcion || !categoriaId || !imagen) {
                return res.status(400).json({
                    success: false,
                    message: "Faltan datos requeridos",
                });
            }
            const nuevaReceta = await Receta.create({
                nombre,
                descripcion,
                categoriaId,
                imagen,
            });
            return res.status(201).json({
                success: true,
                message: "Receta creada con éxito",
                receta: nuevaReceta,
            });
        } catch (error) {
            console.error("Error en crearReceta:", (error as Error).message);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            })
        }
    }
    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const receta = await Receta.findOne({ where: { id } });
            if (!receta) {
                return res.status(404).json({
                    success: false,
                    message: "Receta no encontrada",
                });
            }
            await receta.destroy();
            return res.status(200).json({
                success: true,
                message: "Receta eliminada con éxito",
            });
        } catch (error) {
            console.error("Error en deleteReceta:", (error as Error).message);
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
    async editarReceta(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const receta = await Receta.findOne({ where: { id } })

            if (!receta) {
                return res.status(404).json({
                    success: false,
                    message: "Receta no encontrada",
                })
            }
            receta.update(req.body)
            return res.status(200).json({
                success: true,
                message: "Receta editada con éxito",
                receta: receta,
            })

        } catch (error) {
            console.error("Error en EditarReceta:", (error as Error).message)
            return res.status(500).json({ success: false, message: "Error interno en el servidor" });
        }
    }
}
export default new RecetaController();