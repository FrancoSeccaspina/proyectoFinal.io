import { Request, Response } from 'express';
import { Empleado } from '../../database/models/empleados';
export class empleadoAPIController {
    async listaEmpleados(req: Request, res: Response): Promise<void> {
        try {
            const empleados = await Empleado.findAll();
            console.log(empleados)
            res.json(empleados);

        } catch (error) {
            console.error('Error al listar empleados:', error);
            res.status(500).json({ message: 'Error al obtener los empleados' });
        }
    }
    async buscarEmpleadoPorId(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;
          const empleado = await Empleado.findByPk(id);
          if (empleado) {
            console.log(empleado)
            res.json(empleado);
          } else {
              res.status(404).json({ message: 'empleado no encontrado' });
          }
      } catch (error) {
          console.error('Error al buscar el empleado:', error);
          res.status(500).json({ message: 'Error al obtener el empleado' });
      }
  }
    async editarEmpleado(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nombre, apellido,celular, actividad  } = req.body;
            const empleado = await Empleado.findByPk(id);
            if (empleado) {
                await empleado.update({ nombre, apellido,celular, actividad});
                res.status(200).json({ message: 'empleado actualizado exitosamente', empleado  });
            } else {
                res.status(404).json({ message: 'empleado no encontrado' });
            }
        } catch (error) {
            console.error('Error al editar el empleado:', error);
            res.status(500).json({ message: 'Error al editar el empleado' });
          }
      }
  
      async delete(req: Request, res: Response): Promise<Response> {
        try {
          const { id } = req.params;
          const empleado = await Empleado.findOne({ where: { id } });
  
          if (!empleado) {
            return res.status(404).json({
              success: false,
              message: "empleado no encontrado"
            });
          }
  
          await empleado.destroy();
  
          return res.status(200).json({
            success: true,
            message: "empleado eliminado con éxito"
          });
  
        } catch (error) {
          console.error("Error en delete empleado:", (error as Error).message);
          return res.status(500).json({
            success: false,
            message: "Error interno del servidor"
          });
        }
        
      }
      async crearEmpleado(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, apellido,celular, actividad } = req.body;
            if (!nombre || !apellido || !celular || !actividad) {
                return res.status(400).json({ success: false, message: "Faltan datos requeridos", });
            }
            const nuevoEmpleado = await Empleado.create({
                nombre,
                apellido,
                celular,
                actividad
            });
            return res.status(201).json({
                success: true,
                message: "Empleado creado con exito",
                ejercicio: nuevoEmpleado,
            });
        } catch (error) {
            console.error("Error en el crear Empleado:", (error as Error).message);
            return res.status(500).json({ success: false, message: "Error interno en el servidor" });
        }
    }
      
}



export default new empleadoAPIController();