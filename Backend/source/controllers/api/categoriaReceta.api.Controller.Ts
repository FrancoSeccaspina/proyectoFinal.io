import { Request, Response } from 'express';
import { CategoriaReceta } from '../../database/models/categoria_receta';

export class categoriesRecetaAPIController {
    async listaRecetaPorCategoria(req: Request, res: Response): Promise<void> {
        try{
            const categoria_receta = await CategoriaReceta.findAll();
            console.log(categoria_receta)
            res.json(categoria_receta)
        } catch (error){
            console.error('Error al listar recetas:', error);
            res.status(500).json({ message: 'Error al obtener las recetas' });
        }
    }
}
export default new categoriesRecetaAPIController();