import { Request, Response } from 'express';
import { Cuota } from '../../database/models/cuota';
import { Usuario } from '../../database/models/usuario';
import { Op, fn, col, where } from 'sequelize';
import { calcularMontoActual } from '../../utils/calcularMontoActual';

export class cuotasApiController {
  async crearCuota(req: Request, res: Response): Promise<void> {
    try {
      const {
        fecha,
        descripcion,
        monto,
        estado,
        id_usuario,
        sobrante,
        faltante,
      } = req.body;

      // Validación de campos obligatorios
      if (
        !fecha ||
        !descripcion ||
        !monto ||
        !estado ||
        !id_usuario ||
        faltante === undefined ||
        sobrante === undefined
      ) {
        res.status(400).json({
          success: false,
          message: "Faltan datos requeridos",
        });
        return;
      }

      // Lógica para fecha_fin y estado_membresia
      let fecha_fin: Date | null = null;
      let estado_membresia = estado;

      if (estado === "PAGADA") {
        const fechaInicio = new Date(fecha);
        fecha_fin = new Date(fechaInicio);   
        fecha_fin.setMonth(fecha_fin.getMonth() + 1); 
        estado_membresia = "ACTIVO"; 
      }

      const nuevaCuota = await Cuota.create({
        fecha,
        descripcion,
        monto,
        estado,
        id_usuario,
        faltante,
        sobrante,
        fecha_fin,
        estado_membresia,
      });

      res
        .status(201)
        .json({ message: "Cuota creada con éxito", cuota: nuevaCuota });
    } catch (error) {
      console.error("Error al crear la cuota:", error);
      res.status(500).json({ message: "Error al crear la cuota" });
    }
  }

  async listaCuotas(req: Request, res: Response): Promise<void> {
    try {
      const cuotas = await Cuota.findAll();
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
        res.json(cuota);
      } else {
        res.status(404).json({ message: 'Cuota no encontrada' });
      }
    } catch (error) {
      console.error('Error al buscar la cuota:', error);
      res.status(500).json({ message: 'Error al obtener la cuota' });
    }
  }

  async editarCuota(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        fecha,
        descripcion,
        monto,
        estado,
        faltante,
        sobrante,
      } = req.body;

      const cuota = await Cuota.findByPk(Number(id));

      if (!cuota) {
        res.status(404).json({ message: 'Cuota no encontrada' });
        return;
      }

      // Recalcular fecha_fin y estado_membresia si es pagada
      let fecha_fin: Date | null = cuota.fecha_fin;
      let estado_membresia = cuota.estado_membresia;

      if (estado === "PAGADA") {
        const fechaInicio = new Date(fecha);
        fecha_fin = new Date(fechaInicio.getTime() + 30 * 24 * 60 * 60 * 1000);
        estado_membresia = "ACTIVO";
      }

      await cuota.update({
        fecha,
        descripcion,
        monto,
        estado,
        faltante,
        sobrante,
        fecha_fin,
        estado_membresia,
      });

      res.status(200).json({ message: 'Cuota actualizada exitosamente', cuota });
    } catch (error) {
      console.error('Error al editar la cuota:', error);
      res.status(500).json({ message: 'Error al editar la cuota' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const cuota = await Cuota.findOne({ where: { id } });

      if (!cuota) {
        return res.status(404).json({
          success: false,
          message: "Cuota no encontrada",
        });
      }

      await cuota.destroy();

      return res.status(200).json({
        success: true,
        message: "Cuota eliminada con éxito",
      });
    } catch (error) {
      console.error("Error en deleteCuota:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  registrarCuota = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id_usuario, fecha, pagado } = req.body;

      const montoCalculado = calcularMontoActual(fecha);
      let faltante = 0;
      let sobrante = 0;

      if (pagado < montoCalculado) {
        faltante = montoCalculado - pagado;
      } else if (pagado > montoCalculado) {
        sobrante = pagado - montoCalculado;
      }
      const fecha_fin = null;
      const estado_membresia = 'PENDIENTE';
      const nuevaCuota = await Cuota.create({
        id_usuario,
        fecha,
        monto: montoCalculado,
        estado: 'PENDIENTE',
        descripcion: req.body.descripcion || '',
        faltante,
        sobrante,
        fecha_fin,
        estado_membresia,
      });

      return res.status(201).json(nuevaCuota);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear la cuota' });
    }
  }

  async estadisticasCuotas(req: Request, res: Response): Promise<void> {
    const { anio, mes, id_usuario } = req.query;

    try {
      const whereConditions: any = { estado: 'PAGADA' };

      if (id_usuario) {
        whereConditions.id_usuario = id_usuario;
      }

      if (anio) {
        whereConditions[Op.and] = whereConditions[Op.and] || [];
        whereConditions[Op.and].push(where(fn('YEAR', col('fecha')), anio));
      }

      if (mes) {
        whereConditions[Op.and] = whereConditions[Op.and] || [];
        whereConditions[Op.and].push(where(fn('MONTH', col('fecha')), mes));
      }

      const resultados = await Cuota.findAll({
        attributes: [
          [fn('YEAR', col('fecha')), 'anio'],
          [fn('MONTH', col('fecha')), 'mes'],
          [fn('SUM', col('monto')), 'monto'],
          [fn('COUNT', col('id')), 'cantidad'],
        ],
        where: whereConditions,
        group: ['anio', 'mes'],
        order: [['anio', 'ASC'], ['mes', 'ASC']],
      });

      res.json(resultados);
    } catch (error) {
      console.error('Error al obtener estadísticas de cuotas:', error);
      res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
  }
}

export default new cuotasApiController();
