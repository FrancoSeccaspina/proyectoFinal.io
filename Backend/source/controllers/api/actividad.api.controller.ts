import { Request, Response } from 'express';
import { Actividad } from '../../database/models/actividad';
import { Op, fn, col, where } from 'sequelize';

export class ActividadApiController {
  async crearActividad(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, fecha, horario, cupo, profesor } = req.body;

      // Validación de campos obligatorios
      if (!titulo || !fecha || !horario || !cupo || !profesor) {
        res.status(400).json({
          success: false,
          message: "Faltan datos requeridos",
        });
        return;
      }

      const nuevaActividad = await Actividad.create({
        titulo: titulo,
        fecha: fecha,
        horario: horario,
        cupo: cupo,
        profesor: profesor,
      });

      res.status(201).json({
        success: true,
        message: "Actividad creada exitosamente",
        data: nuevaActividad,
      });
    } catch (error) {
      console.error("Error al crear actividad:", error);
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
    }
    
    async listaActividades(req: Request, res: Response): Promise<void> {
        try {
            const actividades = await Actividad.findAll();
            res.json(actividades);
        } catch (error) {
            console.error("Error al obtener actividades:", error);
            res.status(500).json({
            success: false,
            message: "Error interno del servidor",
            });
        }
    }

async editarActividad(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { titulo, fecha, horario, cupo, profesor } = req.body;

    const actividad = await Actividad.findByPk(id);
    if (!actividad) {
      res.status(404).json({
        message: "Actividad no encontrada",
      });
      return;
    }

    await actividad.update({
      titulo,
      fecha,
      horario,
      cupo,
      profesor,
    });

    res.status(200).json({
      message: "Actividad actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error al editar actividad:", error);
    res.status(500).json({
      message: "Error al editar la actividad",
    });
  }
}

async delete(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const actividad = await Actividad.findOne({ where: { id } });

    if (!actividad) {
      res.status(404).json({
        success: false,
        message: "Actividad no encontrada",
      });
      return;
    }

    await actividad.destroy();

    res.status(200).json({
      success: true,
      message: "Actividad eliminada con éxito",
    });
  } catch (error) {
    console.error("Error en eliminar Actividad:", (error as Error).message);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
}

}

export default new ActividadApiController();