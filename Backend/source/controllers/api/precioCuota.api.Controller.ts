import { Request, Response } from 'express';
import { Precio_Cuota } from '../../database/models/precio_cuota';
import { Usuario } from '../../database/models/usuario';
import { error } from 'console';
export class precioCuotaApiController {
    async listaPrecioCuota(req: Request, res: Response): Promise<void> {
        try {
            const precioCuota = await Precio_Cuota.findAll();
            console.log(precioCuota)
            res.json(precioCuota);

        } catch (error) {
            console.error('Error al listar cuotas:', error);
            res.status(500).json({ message: 'Error al obtener las cuotas' });
        }
    }
    async crearPrecioCuota(req: Request, res: Response): Promise<void> {
        try {
            const { fecha, precio} = req.body;
    
            if (!fecha || !precio) {
                res.status(400).json({ success: false, message: "Faltan datos requeridos" });
            }
    
            const nuevaCuota = await Precio_Cuota.create({
                fecha,
                precio,
            });
    
          res.status(201).json({ message: "Cuota creada con éxito", cuota: nuevaCuota });
        } catch (error) {
            console.error('Error al crear la cuota:', error);
          res.status(500).json({ message: "Error al crear la cuota" });
        }
    }
    async ultimaPrecioCuota(req: Request, res: Response): Promise<void> {
        try {
            const ultimaCuota = await Precio_Cuota.findOne({
                order: [['id', 'DESC']]
            });
    
            if (!ultimaCuota) {
                res.status(404).json({ message: 'No se encontró ningún precio de cuota' });
                return;
            }
    
            res.json(ultimaCuota);
        } catch (error) {
            console.error('Error al obtener el último precio de cuota:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
}



export default new precioCuotaApiController();