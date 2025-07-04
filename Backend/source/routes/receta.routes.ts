import { verificarTokenPorRol } from "../middlewares/verificarToken";
import { Roles } from "../constants/roles";
import { Router } from "express";
import recetaController from "../controllers/recetaController";

const route = Router();

route.get("/recetas", (req, res) => { recetaController.listaReceta(req, res) });
route.get("/recetas/:id", (req, res) => { recetaController.mostrarPorId(req, res) });
route.get("/recetas/categoria/:id", (req, res) => { recetaController.mostrarPorCategoria(req, res) });

route.post("/recetas", verificarTokenPorRol([Roles.ADMIN]), (req, res) => { recetaController.crearReceta(req, res) });
route.delete("/recetas/:id", verificarTokenPorRol([Roles.ADMIN]), (req, res) => { recetaController.delete(req, res) });
route.put("/recetas/:id", verificarTokenPorRol([Roles.ADMIN]), (req, res) => { recetaController.editarReceta(req, res) });

export default route;