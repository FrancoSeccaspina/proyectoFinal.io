import express, { Request, Response, NextFunction } from 'express';
import path, { join } from 'path';
import { port, start } from './modules/server';
import staticHandler from './modules/static';
import cors from 'cors';
import methodOverride from 'method-override';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// Middlewares y rutas
// import userMiddleware from './middlewares/user';
import usersRoutes from './routes/users.routes';

const app = express();

// Ruta pública
const publicPath = path.resolve(__dirname, '../public');
app.use(staticHandler(publicPath));

// Configuración de EJS
app.set('views', join(__dirname, './views'));
app.set('view engine', 'ejs');

// Middleware de body y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
// app.use(session({
//     secret: 'clave',
//     resave: true,
//     saveUninitialized: true
// }));

// Cookies
// app.use(cookieParser());

// Method Override para PUT, PATCH y DELETE
app.use(methodOverride('m'));

// Middleware personalizado
// app.use(userMiddleware);

// Rutas
app.use('/users', usersRoutes);

// Habilitar CORS
app.use(cors());

// Ruta principal
app.get('/home', (req: Request, res: Response) => {
    return res.render('home');
});

// Escuchar el servidor
app.listen(port, start);
