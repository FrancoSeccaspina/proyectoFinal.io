import { Router, Request, Response } from "express";
import carritoController from "../controllers/carritoController";
import validationReserve from "../validations/reserve";


const router = Router();

// Rutas del carrito
router.post("/carrito/agregar", (req: Request, res: Response) => {carritoController.agregarProducto(req, res)});
router.delete("/carrito/eliminar/:id", (req: Request, res: Response) => {carritoController.eliminarProducto(req, res)});
router.get("/carrito/mostrar", (req: Request, res: Response) => {carritoController.mostrarCarrito(req, res)});
router.post("/carrito/reservar", validationReserve, (req: Request, res: Response) => {
  carritoController.reservarCompra(req, res);
});
export default router;
