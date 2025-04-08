"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importStar(require("path"));
const server_1 = require("./modules/server");
const static_1 = __importDefault(require("./modules/static"));
const cors_1 = __importDefault(require("cors"));
const method_override_1 = __importDefault(require("method-override"));
// Middlewares y rutas
// import userMiddleware from './middlewares/user';
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
// Ruta pública
const publicPath = path_1.default.resolve(__dirname, '../public');
app.use((0, static_1.default)(publicPath));
// Configuración de EJS
app.set('views', (0, path_1.join)(__dirname, './views'));
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
app.use('/users', users_routes_1.default);
// Habilitar CORS
app.use((0, cors_1.default)());
// Ruta principal
app.get('/home', (req, res) => {
    return res.render('home');
});
// Escuchar el servidor
app.listen(server_1.port, server_1.start);
