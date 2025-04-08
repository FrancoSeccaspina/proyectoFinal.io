import { Request, Response } from 'express';
import { Producto } from '../database/models/producto';

// Toma todos los productos de la DB y los devuelve en formato JSON
const listaProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al listar productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// Toma un producto por ID de la DB y lo devuelve en formato JSON
const listaProductosPorId = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error al listar productos:', error);
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

export { listaProductos, listaProductosPorId };