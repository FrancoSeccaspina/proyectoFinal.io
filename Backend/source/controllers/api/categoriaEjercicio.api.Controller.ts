import { Request, Response } from 'express';
import { GrupoMuscular } from '../../database/models/grupos_musculares';

export class categoriesGrupoMuscularAPIController {
    async listaEjercicioPorCategoria(req: Request, res: Response): Promise<void> {
        try{
            const grupoMuscular = await GrupoMuscular.findAll();
            console.log(grupoMuscular)
            res.json(grupoMuscular)
        } catch (error){
            console.error('Error al listar los Grupos Musculares:', error);
            res.status(500).json({ message: 'Error al obtener los Grupos Musculares' });
        }
    }
}
export default new categoriesGrupoMuscularAPIController();