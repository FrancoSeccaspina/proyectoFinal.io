import { Router } from "express";
import recetaController from "../controllers/recetaController";
const route = Router();
route.post("/recetas", (req, res) => { recetaController.crearReceta(req, res) });
route.delete("/recetas/:id", (req, res) => { recetaController.delete(req, res) });
route.put("/recetas/:id", (req, res) => { recetaController.editarReceta(req, res) });
route.get("/recetas", (req, res) => { recetaController.listaReceta(req, res) });
route.get("/recetas/:id", (req, res) => { recetaController.mostrarPorId(req, res) });
route.get("/recetas/categoria/:id", (req, res) => { recetaController.mostrarPorCategoria(req, res) });

export default route;