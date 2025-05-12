import { Request, Response } from 'express';
import { Categoria } from '../../database/models/categoria';

export class categoriesAPIController {
    async listaProductosPorCategoria(req: Request, res: Response): Promise<void> {
        try{
            const categoria = await Categoria.findAll();
            console.log(categoria)
            res.json(categoria)
        } catch (error){
            console.error('Error al listar productos:', error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }
}
export default new categoriesAPIController();
