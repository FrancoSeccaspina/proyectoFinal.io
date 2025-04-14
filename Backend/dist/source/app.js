"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server_1 = require("./modules/server");
const static_1 = __importDefault(require("./modules/static"));
const cors_1 = __importDefault(require("cors"));
const method_override_1 = __importDefault(require("method-override"));
// Middlewares y rutas
// import userMiddleware from './middlewares/user';
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const view_routes_1 = __importDefault(require("./routes/view.routes"));
const producto_routes_1 = __importDefault(require("./routes/producto.routes"));
const categoria_routes_1 = __importDefault(require("./routes/categoria.routes"));
const app = (0, express_1.default)();
// Ruta pública
const publicPath = path_1.default.resolve(__dirname, '../public');
app.use((0, static_1.default)(publicPath));
// Configuración de EJS
app.set('views', path_1.default.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
// Middleware de body y JSON
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Sessions
// app.use(session({
//     secret: 'clave',
//     resave: true,
//     saveUninitialized: true
// }));
// Cookies
// app.use(cookieParser());
// Method Override para PUT, PATCH y DELETE
app.use((0, method_override_1.default)('m'));
// Middleware personalizado
// app.use(userMiddleware);
// Rutas
app.use('', view_routes_1.default);
app.use('', users_routes_1.default);
app.use('/productos', producto_routes_1.default);
app.use('/categorias', categoria_routes_1.default);
// Habilitar CORS
app.use((0, cors_1.default)());
// Ruta principal
// app.get('/home', (req: Request, res: Response) => {
//     return res.render('home');
// });
// Escuchar el servidor
app.listen(server_1.port, server_1.start);
