import { Router } from 'express';
import { listaProductos, listaProductosPorId } from '../controllers/productoController';

const router = Router();

// Ruta para listar productos
router.get('/productos', listaProductos);

// Ruta para listar un producto por ID
router.get('/productos/:id', listaProductosPorId);

export default router;