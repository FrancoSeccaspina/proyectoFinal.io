// import cookieParser from 'cookie-parser';
// Middlewares y rutas
// import userMiddleware from './middlewares/user';
import dotenv from 'dotenv';
import express from 'express';
import path, { join } from 'path';
import { port, start } from './modules/server';
import staticHandler from './modules/static';
import cors from 'cors';
import methodOverride from 'method-override';
import session from 'express-session';

import usersRoutes from './routes/users.routes';
import viewRoutes from './routes/view.routes';
import productoRoutes from './routes/producto.routes';
import categoriaRoutes from './routes/categoria.routes';
import grupoMuscularRoutes from './routes/grupo_muscular.routes';
import recetaRoutes from './routes/receta.routes';
import ejercicioRoutes from './routes/ejercicio.routes';
import carritoRoutes from './routes/carrito.routes';
import reservaRoutes from './routes/reserva.routes';

import isAuthenticated from './middlewares/isAuthenticated';
import rutaNoEncontrada from './middlewares/rutaNoEncontrada';

//apis
import productsApiRoutes from './routes/api/products.api.routes';
import usuariosAPIController from './routes/api/users.api.routes';
import ejercicioApiController from './routes/api/ejercicio.api.routes';
import recetaApiController from './routes/api/receta.api.routes';
import categoriaApiController from './routes/api/categoria.api.routes';
import categoriesRecetaAPIController from './routes/api/categoriaReceta.api.routes';
import categoriesGrupoMuscularAPIController from './routes/api/categoriaGrupoMuscular.api.routes'
import proveedorAPIController from './routes/api/proveedores.api.routes'
import cuotaApiController from './routes/api/cuota.api.routes';
import reservaApiRoutes from './routes/api/reservas.api.routes';
import precioCuotaApiController from './routes/api/precioCuota.api.routes';
import transaccionesApiController from './routes/api/transacciones.api.routes';

// cron
import './cron-task/devolver-stock-reservas-vencidas'

// carga las variables de entorno en este caso del archivo .env
dotenv.config();

const app = express();
// Habilitar CORS
app.use(cors());

// Habilitar CORS
app.use(cors());
// Ruta pública
const publicPath = path.resolve(__dirname, '../public/');
app.use(staticHandler(publicPath));

// Configuración de EJS
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware de body y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (!process.env.SESSION_PASSWORD) {
    throw new Error('La variable de entorno SESSION_PASSWORD no está definida');
}

// Sessions
app.use(session({
    secret: process.env.SESSION_PASSWORD,
    resave: true,
    saveUninitialized: false,
    cookie: { secure: false } // Cambiar a true en producción
}));

// Verifica si hay un usuario en la sesión
app.use(isAuthenticated.setUsuarioLogueado);
// Cookies
// app.use(cookieParser());

// Method Override para PUT, PATCH y DELETE
app.use(methodOverride('_method'));

// Middleware personalizado
// app.use(userMiddleware);

// Rutas
app.use('', viewRoutes);
app.use('', usersRoutes);
app.use('', productoRoutes);
app.use('', grupoMuscularRoutes)
app.use('', ejercicioRoutes);
app.use('', recetaRoutes);
app.use('', carritoRoutes);
app.use('', reservaRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/images', express.static('public/images'));

//APIS
app.use('/api',
    productsApiRoutes,
    usuariosAPIController,
    ejercicioApiController,
    recetaApiController,
    categoriaApiController,
    categoriesRecetaAPIController,
    categoriesGrupoMuscularAPIController,
    proveedorAPIController,
    cuotaApiController,
    reservaApiRoutes,
    precioCuotaApiController,
    transaccionesApiController
);

// verifica que las rutas no existan y redirige a la página de error 404
app.use(rutaNoEncontrada);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// Escuchar el servidor
app.listen(port, start);
