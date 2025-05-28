import { Request, Response } from "express";
import { SessionService } from '../services/serivicioSesion';
import { obtenerProductosEnCarrito } from '../services/servicioCarrito';
import { Producto } from "../database/models";

interface ProductoCarrito {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoriaId: number;
    imagen: string;
    stock: number;
    cantidad: number;
    subtotal: number;
}

interface ResultadoCarrito {
    productos: ProductoCarrito[];
    resultados: {
        total: number;
        cantidadDeProductos: number;
    };
}


class carritoController {
    async agregarProducto(req: Request, res: Response) {
        try {
            if (!req.body || !req.body.id_producto || !req.body.cantidad) {
                throw new Error("Faltan datos en la solicitud");
            }

            const { id_producto, cantidad } = req.body;
            const producto = await Producto.findByPk(id_producto);

            if (!producto) {
                throw new Error("Producto no encontrado");
            }

            if (cantidad > producto.stock) {
                return res.status(400).render("productDetail", {
                    // TODO : agregar etiqueta message en las vistas
                    message: "La cantidad solicitada supera el stock disponible",
                    producto: producto
                });
            }

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

    public async eliminarProducto(req: Request, res: Response) {
        try {

            const { id } = req.params;
            const id_producto = parseInt(id, 10);
            SessionService.borrarProductoDelCarrito(req, id_producto)
            return res.redirect("/carrito/mostrar");
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

    public async mostrarCarrito(req: Request, res: Response) {
        try {
            const productosCarrito = await obtenerProductosEnCarrito(req);
            const usuarioLogueado = SessionService.usuarioLogeado(req);
            res.render("carrito", {
                productosCarrito: productosCarrito,
                showModal: false,
                usuarioLogueado: usuarioLogueado
            });

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
}

export default new carritoController();
