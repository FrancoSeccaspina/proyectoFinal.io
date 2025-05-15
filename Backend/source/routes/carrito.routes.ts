import { Router } from "express";
import carritoController from "../controllers/carritoController";

const router = Router();

// Rutas del carrito
router.post("/carrito/agregar", (req, res) => carritoController.agregarProducto(req, res));
router.delete("/carrito/eliminar/:id", (req, res) => carritoController.eliminarProducto(req, res));
router.get("/carrito/mostrar", (req, res) => carritoController.mostrarCarrito(req, res));
// router.post("/carrito/finalizar", (req, res) => carritoController.finalizarCompra(req, res));

export default router;
