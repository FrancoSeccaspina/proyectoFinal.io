import { Request, Response } from 'express';
import { Receta } from '../../database/models/receta';
export class recetaAPIController {
    async listarRecetas(req: Request, res: Response): Promise<void> {
        try {
            const recetas = await Receta.findAll();
            console.log(recetas)
            res.json(recetas);

        } catch (error) {
            console.error('Error al listar recetas:', error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }
    async buscarRecetasPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const receta = await Receta.findByPk(id);
            if (receta) {
              console.log(receta)
              res.json(receta);
            } else {
                res.status(404).json({ message: 'Receta no encontrada' });
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            res.status(500).json({ message: 'Error al obtener el producto' });
        }
    }
    async editarReceta(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nombre, descripcion,categoriaId, imagen  } = req.body;
            const receta = await Receta.findByPk(id);
            if (receta) {
                const nuevaImagen = req.file ? req.file.filename : receta.imagen;
                await receta.update({ nombre, descripcion,categoriaId, imagen: nuevaImagen });
                res.status(200).json({ message: 'Producto actualizado exitosamente', receta });
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error('Error al editar el producto:', error);
            res.status(500).json({ message: 'Error al editar el producto' });
        }
    }
       async crearReceta(req: Request, res: Response): Promise<Response> {
        const imagen = req.file?.filename;
      
        try {
          const { nombre,categoriaId, descripcion } = req.body;
      
          if (!nombre || !descripcion || !imagen) {
            return res.status(400).json({ success: false, message: "Faltan datos requeridos" });
          }
      
          const nuevoProducto = await Receta.create({
            nombre,
            descripcion,
            categoriaId,
            imagen,
          });
      
          return res.status(201).json({
            success: true,
            message: 'Receta creada exitosamente',
          });
        } catch (error) {
          console.error("Error en el crearReceta:", error);
          return res.status(500).json({ success: false, message: "Error interno en el servidor" });
        }
      }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const receta = await Receta.findOne({ where: { id } });

        if (!receta) {
            return res.status(404).json({
                success: false,
                message: "Receta no encontrada"
            });
        }

        await receta.destroy();
        return res.status(200).json({
            success: true,
            message: "Receta eliminada con éxito",
        });

    } catch (error) {
        console.error("Error en deleteReceta:", (error as Error).message);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
}

}



export default new recetaAPIController();