import { Router } from 'express';
import { listaProductos, buscarProductosPorId, crearProducto } from '../controllers/productoController';

const router = Router();

//ruta para crear un producto
router.post('/productos', (req, res) => { crearProducto(req, res) });

// Ruta para listar productos
router.get('/productos', listaProductos);

// Ruta para buscar un producto por ID
router.get('/productos/:id', buscarProductosPorId);

export default router;