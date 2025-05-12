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
}



export default new productoAPIController();