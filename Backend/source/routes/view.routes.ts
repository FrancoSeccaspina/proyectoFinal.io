import express from 'express';
import path from 'path';
import fs from 'fs';
import usersController from '../controllers/usersController';

// import registerValidator from '../validations/register';
// import loginValidator from '../validations/login';
// import isLogged from '../middlewares/isLogged';
// import isAdmin from '../middlewares/isAdmin';

const route = express.Router();

route.get("/home", function(req,res){
    res.render("home");
});
route.get("/rutinas", function(req,res){
    res.render("rutinas");
});
route.get("/recetas", function(req,res){
    res.render("recetas");
});
route.get("/productos", function(req,res){
    res.render("productos");
});
route.get("/listaProductos", function(req,res){
    res.render("listaProductos");
});

export default route;