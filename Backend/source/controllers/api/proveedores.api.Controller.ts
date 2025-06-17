import { Request, Response } from 'express';
import { Proveedor } from '../../database/models/proveedores';
export class proveedorAPIController {
    async listaProveedores(req: Request, res: Response): Promise<void> {
        try {
            const proveedores = await Proveedor.findAll();
            console.log(proveedores)
            res.json(proveedores);

        } catch (error) {
            console.error('Error al listar proveedores:', error);
            res.status(500).json({ message: 'Error al obtener los proveedores' });
        }
    }
    async buscarProveedorPorId(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;
          const proveedor = await Proveedor.findByPk(id);
          if (proveedor) {
            console.log(proveedor)
            res.json(proveedor);
          } else {
              res.status(404).json({ message: 'proveedor no encontrado' });
          }
      } catch (error) {
          console.error('Error al buscar el proveedor:', error);
          res.status(500).json({ message: 'Error al obtener el proveedor' });
      }
  }
    async editarProveedor(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nombre, apellido,celular  } = req.body;
            const proveedor = await Proveedor.findByPk(id);
            if (proveedor) {
                await proveedor.update({ nombre, apellido,celular});
                res.status(200).json({ message: 'proveedor actualizado exitosamente', proveedor  });
            } else {
                res.status(404).json({ message: 'proveedor no encontrado' });
            }
        } catch (error) {
            console.error('Error al editar el proveedor:', error);
            res.status(500).json({ message: 'Error al editar el proveedor' });
          }
      }
  
      async delete(req: Request, res: Response): Promise<Response> {
        try {
          const { id } = req.params;
          const proveedor = await Proveedor.findOne({ where: { id } });
  
          if (!proveedor) {
            return res.status(404).json({
              success: false,
              message: "Proveedor no encontrado"
            });
          }
  
          await proveedor.destroy();
  
          return res.status(200).json({
            success: true,
            message: "Proveedor eliminado con éxito"
          });
  
        } catch (error) {
          console.error("Error en deleteProveedor:", (error as Error).message);
          return res.status(500).json({
            success: false,
            message: "Error interno del servidor"
          });
        }
        
      }
      async crearProveedor(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, apellido,celular } = req.body;
            if (!nombre || !apellido || !celular) {
                return res.status(400).json({ success: false, message: "Faltan datos requeridos", });
            }
            const nuevoProveedor = await Proveedor.create({
                nombre,
                apellido,
                celular,
            });
            return res.status(201).json({
                success: true,
                message: "Proveedor creado con exito",
                ejercicio: nuevoProveedor,
            });
        } catch (error) {
            console.error("Error en el crearProveedor:", (error as Error).message);
            return res.status(500).json({ success: false, message: "Error interno en el servidor" });
        }
    }
      
}



export default new proveedorAPIController();