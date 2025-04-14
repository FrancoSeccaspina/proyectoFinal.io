"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import registerValidator from '../validations/register';
// import loginValidator from '../validations/login';
// import isLogged from '../middlewares/isLogged';
// import isAdmin from '../middlewares/isAdmin';
const route = express_1.default.Router();
route.get("/home", function (req, res) {
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
/*route.get("/login", function(req,res){
    res.render("login");
});*/
route.get("/register", function (req, res) {
    res.render("register");
});
exports.default = route;
