import { Request, Response } from "express";
import { Producto } from '../database/models/producto';

declare module "express-session" {
    interface SessionData {
        carrito?: Array<{ id: number; cantidad: number }>;
    }
}

class carritoController {
    private static inicializarCarrito(req: Request, res: Response) {
        if (!req.session.carrito) {
            req.session.carrito = [];
        }
    }

    public agregarProducto(req: Request, res: Response) {
        carritoController.inicializarCarrito(req, res);
        const { id, cantidad } = req.body;
        const productoExistente = req.session.carrito.find((item: any) => item.id === id);
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            const nuevoProducto = { id, cantidad };
            req.session.carrito.push(nuevoProducto);
        }

        res.status(200).json({ message: "Producto agregado al carrito" });
    }

    public eliminarProducto(req: Request, res: Response) {
        try {
            carritoController.inicializarCarrito(req, res);
            const { id } = req.body;
            req.session.carrito = req.session.carrito.filter((item: any) => item.id !== id);
            res.status(200).json({ message: "Producto eliminado del carrito" });
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            res.status(500).json({ message: "Error al eliminar producto del carrito" });
        }
    }
    public verCarrito(req: Request, res: Response) {
        try {
            carritoController.inicializarCarrito(req, res);
            const carrito = req.session.carrito;
            res.status(200).json(carrito);
        } catch (error) {
            console.error("Error al ver carrito:", error);
            res.status(500).json({ message: "Error al ver carrito" });
        }
    }
    public finalizarCompra(req: Request, res: Response) {
        try {
            carritoController.inicializarCarrito(req, res);
            const carrito = req.session.carrito;
            if (carrito.length === 0) {
                return res.status(400).json({ message: "El carrito está vacío" });
            }
            // Aquí puedes agregar la lógica para procesar el pago y finalizar la compra
            // Por ejemplo, guardar la compra en la base de datos o enviar un correo de confirmación

            // Limpiar el carrito después de finalizar la compra
            req.session.carrito = [];
            res.status(200).json({ message: "Compra finalizada con éxito" });
        } catch (error) {
            console.error("Error al finalizar compra:", error);
            res.status(500).json({ message: "Error al finalizar compra" });
        }
    }

}
export default new carritoController();