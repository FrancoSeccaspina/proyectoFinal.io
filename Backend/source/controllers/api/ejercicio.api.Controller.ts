import { Request, Response } from "express";
import { Ejercicio } from "../../database/models/ejercicio";
export class ejerciciosApiController {
    async listaEjercicios(req: Request, res: Response): Promise<void> {
        try {
            const ejercicios = await Ejercicio.findAll();
            console.log(ejercicios)
            res.json(ejercicios);

        } catch (error) {
            console.error('Error al listar Ejercicios:', error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }
    async buscarEjercicioPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const ejercicio = await Ejercicio.findByPk(id);
            if (ejercicio) {
              console.log(ejercicio)
              res.json(ejercicio);
            } else {
                res.status(404).json({ message: 'Ejercicio no encontrado' });
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            res.status(500).json({ message: 'Error al obtener el producto' });
        }
    }
    async editarEjercicio(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;
          const { nombre, descripcion,grupo_muscular_id,video,titulo} = req.body;
          const ejercicio = await Ejercicio.findByPk(id);
          if (ejercicio) {
              await ejercicio.update({ nombre, descripcion,grupo_muscular_id,video,titulo});
              res.status(200).json({ message: 'Producto actualizado exitosamente', ejercicio });
          } else {
              res.status(404).json({ message: 'Producto no encontrado' });
          }
      } catch (error) {
          console.error('Error al editar el producto:', error);
          res.status(500).json({ message: 'Error al editar el producto' });
      }
  }
  async crearEjercicio(req: Request, res: Response): Promise<Response> {
    try {
        const { nombre, descripcion, grupo_muscular_id, video, titulo } = req.body;
        if (!nombre || !descripcion || !descripcion || !grupo_muscular_id || !video || !titulo) {
            return res.status(400).json({ success: false, message: "Faltan datos requeridos", });
        }
        const nuevoEjercicio = await Ejercicio.create({
            nombre,
            descripcion,
            grupo_muscular_id,
            video,
            titulo
        });
        return res.status(201).json({
            success: true,
            message: "Ejercicio creado con exito",
            ejercicio: nuevoEjercicio,
        });
    } catch (error) {
        console.error("Error en el crearEjercicio:", (error as Error).message);
        return res.status(500).json({ success: false, message: "Error interno en el servidor" });
    }
    
}
async delete(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const ejercicio = await Ejercicio.findOne({ where: { id } });

        if (!ejercicio) {
            return res.status(404).json({
                success: false,
                message: "Ejercicio no encontrado"
            })
        }
        await ejercicio.destroy();
        return res.status(200).json({
            success: true,
            message: "ejercicio eliminado con éxito",
        });
    } catch (error) {
        console.error("Error en deleteEjercicio:", (error as Error).message);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
}
}
export default new ejerciciosApiController();