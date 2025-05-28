/*import { Request, Response } from 'express';
import { Producto } from '../../database/models/producto';


const productsAPIController = {
  list: async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await Producto.findAll();
      res.json({
        meta: {
          status: 200,
          total: products.length,
          url: 'api/products',
        },
        data: products,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  detail: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Producto.findByPk(req.params.id);
      res.json({
        meta: {
          status: 200,
          url: '/api/products/:id',
        },
        data: product,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  },

  last: async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await Producto.findOne({
        order: [['id', 'DESC']],
      });

      res.json({
        meta: {
          status: 200,
          url: 'api/products/last',
        },
        data: product,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el último producto' });
    }
  },
};

export default productsAPIController;
*/


import { Request, Response } from 'express';
import { Producto } from '../../database/models/producto';
import { error } from 'console';
export class productoAPIController {
    async listaProductos(req: Request, res: Response): Promise<void> {
        try {
            const productos = await Producto.findAll();
            console.log(productos)
            res.json(productos);

        } catch (error) {
            console.error('Error al listar productos:', error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }
    async buscarProductosPorId(req: Request, res: Response): Promise<void> {
      try {
          const { id } = req.params;
          const producto = await Producto.findByPk(id);
          if (producto) {
            console.log(producto)
            res.json(producto);
          } else {
              res.status(404).json({ message: 'Producto no encontrado' });
          }
      } catch (error) {
          console.error('Error al buscar el producto:', error);
          res.status(500).json({ message: 'Error al obtener el producto' });
      }
  }
  async editarProducto(req: Request, res: Response): Promise<void> {
    
    try {
        const { id } = req.params;
        const { nombre, descripcion,precio, stock  } = req.body;
        const producto = await Producto.findByPk(id);
        
        if (producto) {
            const nuevaImagen = req.file ? req.file.filename : producto.imagen;
            await producto.update({ nombre, descripcion,precio,imagen: nuevaImagen, stock });
            res.status(200).json({ message: 'Producto actualizado exitosamente', producto });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al editar el producto:', error);
        res.status(500).json({ message: 'Error al editar el producto' });
    }
}
async crearProducto(req: Request, res: Response): Promise<Response> {
  const imagen = req.file?.filename;

  try {
    const { nombre, precio, categoriaId, descripcion, stock } = req.body;

    if (!nombre || !descripcion || !precio || !stock || !imagen) {
      return res.status(400).json({ success: false, message: "Faltan datos requeridos" });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      categoriaId,
      imagen,
      stock
    });

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error("Error en el crearProducto:", error);
    return res.status(500).json({ success: false, message: "Error interno en el servidor" });
  }
}

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const producto = await Producto.findOne({ where: { id } });

      if (!producto) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
      }

      await producto.destroy();

      return res.status(200).json({
        success: true,
        message: "Producto eliminado con éxito",
      });
    } catch (error) {
      console.error("Error en deleteProducto:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }
}

export default new productoAPIController();