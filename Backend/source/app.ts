// import cookieParser from 'cookie-parser';
// Middlewares y rutas
// import userMiddleware from './middlewares/user';
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
import isAuthenticated from './middlewares/isAuthenticated';
import dotenv from 'dotenv';

// carga las variables de entorno en este caso del archivo .env
dotenv.config();

const app = express();

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
app.use(methodOverride('m'));

// Middleware personalizado
// app.use(userMiddleware);

// Rutas
app.use('', viewRoutes);
app.use('', usersRoutes);
app.use('', productoRoutes);
app.use('', grupoMuscularRoutes)
app.use('', ejercicioRoutes);
app.use('', recetaRoutes);
app.use('/categorias', categoriaRoutes);

// Habilitar CORS
app.use(cors());

// Escuchar el servidor
app.listen(port, start);
