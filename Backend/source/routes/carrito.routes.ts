import { Router, Request, Response } from "express";
import carritoController from "../controllers/carritoController";

const router = Router();

// Rutas del carrito
router.post("/carrito/agregar", (req: Request, res: Response) => {carritoController.agregarProducto(req, res)});
router.delete("/carrito/eliminar/:id", (req: Request, res: Response) => {carritoController.eliminarProducto(req, res)});
router.get("/carrito/mostrar", (req: Request, res: Response) => {carritoController.mostrarCarrito(req, res)});
router.post("/carrito/reservar", (req: Request, res: Response) => {
  carritoController.reservarCompra(req, res);
});
router.get("/carrito/mostrar/ultimaReserva", (req: Request, res: Response) => {carritoController.mostrarUltimaReserva(req, res)});
router.get("/carrito/mostrar/reservas", (req: Request, res: Response) => {carritoController.mostrarTodasLasReservas(req, res)});

export default router;
