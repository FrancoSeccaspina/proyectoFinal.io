import { Router } from 'express';
import productoAPIController from '../../controllers/api/producto.api.Controller';
import multer from 'multer';
import path from 'path';
import { error } from 'console';

const route = Router();

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


// Rutas API
route.get('/productos', productoAPIController.listaProductos.bind(productoAPIController));

route.get('/productos/:id', (req, res) => {
  productoAPIController.buscarProductosPorId(req, res);
});
//ruta para crear un producto
route.post('/productos', upload.single('imagen'), (req, res) => { productoAPIController.crearProducto(req, res) });


// Ruta para editar producto con imagen
route.put('/productoEditar/:id', upload.single('imagen'), (req, res) => {
  productoAPIController.editarProducto(req, res);
});

route.delete('/productos/:id', (res, req) => { productoAPIController.delete(res, req) })

export default route;