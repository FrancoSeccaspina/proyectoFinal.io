import { Op } from "sequelize";
import { Request, Response } from "express";
import { Producto } from '../database/models/producto';
import { SessionService } from '../services/serivicioSesion'


class carritoController {

    async agregarProducto(req: Request, res: Response) {
        try {

            const carrito = SessionService.obtenerCarrito(req);
            const { id_producto, cantidad } = req.body;
            const producto = await Producto.findByPk(id_producto);

            SessionService.agregarProductoAlCarrito(req, id_producto, cantidad);
            res.render('productDetail', { message: "Producto agregado al carrito", producto: producto });
        } catch (error) {
            console.error("Error al ver producto:", (error as Error).message);
            return res.status(500).render("error", {
                title: "Error del servidor",
                code: 500,
                message: "Error del servidor",
                description: "Ocurrió un error inesperado.",
                error: (error as Error).message
            });
        }
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

    public async mostrarCarrito(req: Request, res: Response) {
        try {
            const carrito = SessionService.obtenerCarrito(req);

            const idsProductos = carrito.map((item: any) => item.id_producto);
            const productos = await Producto.findAll({
                where: {
                    id: {
                        [Op.in]: idsProductos,
                    },
                },
            });
            
            res.render("carrito", { productos });
        } catch (error) {
            console.error("Error al ver carrito:", (error as Error).message);
            return res.status(500).render("error", {
                title: "Error del servidor",
                code: 500,
                message: "Error del servidor",
                description: "Ocurrió un error inesperado.",
                error: (error as Error).message
            });
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