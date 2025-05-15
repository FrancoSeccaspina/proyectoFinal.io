import { Request, Response } from "express";
import { Producto } from '../database/models/producto';
import { SessionService } from '../services/serivicioSesion'


class carritoController {

    public agregarProducto(req: Request, res: Response) {
        const carrito = SessionService.obtenerCarrito(req);
        const { id_producto, cantidad } = req.body;

        SessionService.agregarProductoAlCarrito(req, id_producto, cantidad);

        console.log("Carrito actualizado:", carrito);
        res.status(200).json({ message: "Producto agregado al carrito" });
    }

    public eliminarProducto(req: Request, res: Response) {
        try {   
            const { id } = req.body;
            SessionService.borrarProductoDelCarrito(req, id)
            res.status(200).json({ message: "Producto eliminado del carrito" });

        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            res.status(500).json({ message: "Error al eliminar producto del carrito" });
        }
    }
    
    public mostrarCarrito(req: Request, res: Response) {
        try {
            const carrito = SessionService.obtenerCarrito(req);
            res.status(200).json(carrito);
        } catch (error) {
            console.error("Error al ver carrito:", error);
            res.status(500).json({ message: "Error al ver carrito" });
        }
    }


    // confirmada la reserva con los datos del formulario ( dni o email del usuario) pasar los datos a la tabla reserva y detalle de reserva y aliminar el carrito

    // public finalizarCompra(req: Request, res: Response) {
    //     try {
    //         carritoController.inicializarCarrito(req, res);
    //         const carrito = req.session.carrito;
    //         if (carrito.length === 0) {
    //             return res.status(400).json({ message: "El carrito está vacío" });
    //         }
    //         // Aquí puedes agregar la lógica para procesar el pago y finalizar la compra
    //         // Por ejemplo, guardar la compra en la base de datos o enviar un correo de confirmación

    //         // Limpiar el carrito después de finalizar la compra
    //         req.session.carrito = [];
    //         res.status(200).json({ message: "Compra finalizada con éxito" });
    //     } catch (error) {
    //         console.error("Error al finalizar compra:", error);
    //         res.status(500).json({ message: "Error al finalizar compra" });
    //     }
    // }

}
export default new carritoController();