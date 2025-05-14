import { Request, Response } from 'express';
import { Producto } from '../database/models/producto';
import { error } from 'console';
export class productoController {

    async crearProducto(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, precio,categoriaId, descripcion } = req.body;
            const nuevoProducto = await Producto.create({ nombre, descripcion, precio, categoriaId, imagen: '', stock: 0 });
            res.status(201).json({
                message: 'Producto creado exitosamente',
                producto: nuevoProducto,
            });
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).json({
                message: 'Error al crear el producto',
                error: (error as Error).message,
            });
        }
    }
    // Toma todos los productos de la DB y los devuelve en formato JSON
    async listaProductos(req: Request, res: Response): Promise<void> {
        try {
            const productos = await Producto.findAll();
            console.log(productos)
            res.render('productos', { productos });

        } catch (error) {
            console.error('Error al listar productos:', error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }

    // Toma un producto por ID de la DB y lo devuelve en formato JSON
    async buscarProductosPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id);
            if (producto) {
                res.render("productDetail", { producto });
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
            res.status(500).json({ message: 'Error al obtener el producto' });
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id);
            if (producto) {
                await producto.destroy();
                res.status(200).json({ message: 'Producto eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ message: 'Error al eliminar el producto' });
        }
    }
    async editarProducto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nombre, precio, descripcion } = req.body;
            const producto = await Producto.findByPk(id);
            if (producto) {
                await producto.update({ nombre, precio, descripcion });
                res.status(200).json({ message: 'Producto actualizado exitosamente', producto });
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            console.error('Error al editar el producto:', error);
            res.status(500).json({ message: 'Error al editar el producto' });
        }
    }
}



export default new productoController();