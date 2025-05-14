import { Request, Response } from 'express';
import { Carrito, Producto } from '../database/models';

export class carritoController {

    async agregarProducto(req: Request, res: Response): Promise<void> {
        try {

            if (!req.session.usuario) {
                return res.redirect('/login');
            }

            const id_usuario = req.session.usuario.id;
            const { id_producto, cantidad } = req.body;
            const stock_producto = await Producto.findOne({ where: { id: id_producto } });
            console.log("stock_producto")
            console.log(stock_producto)
            const nuevoCarrito = await Carrito.create({
                id_usuario,
                id_producto,
                cantidad
            });

            res.status(201).json({
                message: 'Producto creado exitosamente',
                producto: nuevoCarrito,
            });

        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).json({
                message: 'Error al crear el producto',
                error: (error as Error).message,
            });
        }
    }
}

export default new carritoController();