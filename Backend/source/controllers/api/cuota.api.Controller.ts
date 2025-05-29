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
    async buscarCuotasPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const cuota = await Cuota.findByPk(id);
            if (cuota) {
                console.log(cuota)
                res.json(cuota);
              } else {
                  res.status(404).json({ message: 'cuota no encontrada' });
              }
        } catch (error) {
            console.error('Error al buscar las cuotas:', error);
            res.status(500).json({ message: 'Error al obtener las cuotas' });
        }
    }
    async editarCuota(req: Request, res: Response): Promise<void> {
        try{
            const { id } = req.params;
            const { fecha, descripcion, monto, estado } = req.body;
            const cuota = await Cuota.findByPk(id);
    
            if (cuota) {
                await cuota.update({ fecha, descripcion,monto, estado });
                res.status(200).json({ message: 'cuota actualizado exitosamente', cuota });
            } else {
                res.status(404).json({ message: 'cuota no encontrado' });
            }
        } catch (error) {
            console.error('Error al editar el cuota:', error);
            res.status(500).json({ message: 'Error al editar el cuota' });
        }
    }
    async delete(req: Request, res: Response): Promise<Response> {
        try {
          const { id } = req.params;
          const cuota = await Cuota.findOne({ where: { id } });
  
          if (!cuota) {
            return res.status(404).json({
              success: false,
              message: "cuota no encontrada"
            });
          }
  
          await cuota.destroy();
  
          return res.status(200).json({
            success: true,
            message: "cuota eliminada con éxito"
          });
  
        } catch (error) {
          console.error("Error en deletecuota:", (error as Error).message);
          return res.status(500).json({
            success: false,
            message: "Error interno del servidor"
          });
        }
      }
}



export default new cuotasApiController();