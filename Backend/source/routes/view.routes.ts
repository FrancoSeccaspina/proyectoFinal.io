import { verificarTokenPorRol } from '../middlewares/verificarToken';
import { Roles } from '../constants/roles';
import express from 'express';
import middleware from '../middlewares/isAuthenticated';

const route = express.Router();

route.get("/", function (req, res) {
    res.render("home");
});
route.get("/rutinas", function (req, res) {
    res.render("rutinas");
});
route.get("/recetas", function (req, res) {
    res.render("recetas");
});
route.get("/listaProductos", function (req, res) {
    res.render("listaProductos");
});
route.get("/productDetail", function (req, res) {
    res.render('productDetail');
});
route.get("/login", function (req, res) {
    res.render("login");
});
route.get("/register", function (req, res) {
    res.render("register");
});
route.get("/carrito", function (req, res) {
    res.render("carrito");
});
route.get("/mPago", function (req, res) {
    res.render("mPago");
});
route.get("/transferencia", function (req, res) {
    res.render("transferencia");
});
route.get('/perfil', verificarTokenPorRol([Roles.CLIENTE]), middleware.setUsuarioLogueado, (req, res) => {
    res.render('perfil'); // los datos están en res.locals.usuarioLogueado
});
route.get('/perfil/editar', verificarTokenPorRol([Roles.CLIENTE]), middleware.setUsuarioLogueado, (req, res) => {
    res.render('perfilEditar'); // los datos están en res.locals.usuarioLogueado
});
route.get("/finalizarCompra", function (req, res) {
    res.render("finalizarCompra");
});
route.get("/error", function (req, res) {
    res.render('error', {
        code: 404,
        message: 'Página no encontrada',
        description: 'La página solicitada no existe.'
    });
});

export default route;