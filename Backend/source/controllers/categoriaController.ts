import { Request, Response } from "express";
import { Categoria } from "../database/models/categoria";

export class categoriaController {
    // Toma todas las categorias de la DB y las devuelve en formato JSON
    async listaCategorias(req: Request, res: Response): Promise<void> {
        try {
            const categorias = await Categoria.findAll();
            console.log(categorias);
            res.render("categorias", { categorias });
        } catch (error) {
            console.error("Error al listar categorias:", error);
            res.status(500).json({ message: "Error al obtener las categorias" });
        }
    }
    //buscar una categoria en base a su ID y devolverla en formato JSON
    async buscarCategoriasPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const categoria = await Categoria.findByPk(id);
            if (categoria) {
                res.status(200).json(categoria);
            } else {
                res.status(404).json({ message: "Categoria no encontrada" });
            }
        } catch (error) {
            console.error("Error al buscar la categoria:", error);
            res.status(500).json({ message: "Error al obtener la categoria" });
        }
    }

}
export default new categoriaController();