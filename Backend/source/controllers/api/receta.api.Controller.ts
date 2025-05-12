import { Request, Response } from 'express';
import { Receta } from '../../database/models/receta';
export class recetaAPIController {
    async listarRecetas(req: Request, res: Response): Promise<void> {
        try {
            const recetas = await Receta.findAll();
            console.log(recetas)
            res.json(recetas);

        } catch (error) {
            console.error('Error al listar recetas:', error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }
}



export default new recetaAPIController();