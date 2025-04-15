import { Request, Response } from 'express';
import { GrupoMuscular } from '../database/models/grupos_musculares';

export class grupoMuscularController {
    async listaGrupoMuscular(req: Request, res: Response): Promise<void> {
            try {
                const gruposMusculares = await GrupoMuscular.findAll();
                console.log(gruposMusculares)
                res.json(gruposMusculares);
                //res.render('ejercicios', {grupoMuscular})
                
            } catch (error) {
                console.error('Error al listar Grupos Musculares:', error);
                res.status(500).json({ message: 'Error al obtener los Grupos Musculares' });
                
            }
    }
}

export default new grupoMuscularController();