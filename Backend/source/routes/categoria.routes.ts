import { Router } from "express";
import categoriaController from "../controllers/categoriaController";
const route = Router();

route.get("/categorias", (req, res) => { categoriaController.listaCategorias(req, res) });
route.get("/categorias/:id", (req, res) => { categoriaController.buscarCategoriasPorId(req, res) });

export default route;