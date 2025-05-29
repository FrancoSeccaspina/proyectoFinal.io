import { Request, Response } from 'express';
import { Cuota } from '../../database/models/cuota';
import { Usuario } from '../../database/models/usuario';
import { error } from 'console';
export class cuotasApiController {
    async listaCuotas(req: Request, res: Response): Promise<void> {
        try {
            const cuotas = await Cuota.findAll();
            console.log(cuotas)
            res.json(cuotas);

        } catch (error) {
            console.error('Error al listar cuotas:', error);
            res.status(500).json({ message: 'Error al obtener las cuotas' });
        }
    }
    async buscarCuotasPorUsuarioId(req: Request, res: Response): Promise<void> {
        try {
            const { id_usuario } = req.params;
    
            const cuotas = await Cuota.findAll({
                where: { id_usuario: Number(id_usuario) },
                order: [['fecha', 'DESC']],
            });
    
            if (cuotas.length > 0) {
                res.json(cuotas);
            } else {
                res.status(404).json({ message: 'No se encontraron cuotas para este usuario' });
            }
        } catch (error) {
            console.error('Error al buscar las cuotas:', error);
            res.status(500).json({ message: 'Error al obtener las cuotas' });
        }
    }
}



export default new cuotasApiController();