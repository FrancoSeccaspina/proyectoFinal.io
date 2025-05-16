import { Op } from "sequelize";
import { Request, Response } from "express";
import { Producto } from '../database/models/producto';
import { SessionService } from '../services/serivicioSesion'
import { Json } from "sequelize/types/utils";
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

class carritoController {
    /**
     * Obtiene los productos desde la DB filtrando por los ids del carrito 
     * mapea los productos con la cantidad y el total
     * y devuelve un array con los productos mapeados.
     * 
     * @param req 
     * @param carrito
     * @returns array mapeado agregando la clave valor cantidad y total ProductoCarrito[]
     * 
     * @example
     * [
        {
            id: 1,
            nombre: '..',
            descripcion: '....',    
            precio: 0,
            categoriaId: 0,
            imagen: '...jpg',
            stock: 0,
            cantidad: 0,
            total: 0
        }
        ]
     */
    private async mapCarritoProductos(req: Request, carrito:Array<{ id_producto: number, cantidad: number }>): Promise<ProductoCarrito[]> {
        if(carrito.length === 0) {
            return [];
        }

        const carritoParseInt = carrito.map((item: any) => {
            return {
                id_producto: parseInt(item.id_producto, 10),
                cantidad: parseInt(item.cantidad, 10)
            }
        });

        const idsProductosCarrito = carritoParseInt.map((item: any) => item.id_producto);
        const productos = await Producto.findAll({
            where: {
                id: {
                    [Op.in]: idsProductosCarrito,
                },
            },
        });

        const productosJson = productos.map((producto: any) => producto.toJSON());
        return productosJson.map((producto: any) => {

            const itemCarrito = carritoParseInt.find((item: any) => item.id_producto == producto.id);
            producto.cantidad = itemCarrito? itemCarrito.cantidad : 0;
            producto.subtotal = producto.precio * producto.cantidad
            return producto;
        });
    }

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
            const productosCarrito = await this.mapCarritoProductos(req, carrito);
            const total = productosCarrito.reduce((acc: number, producto: ProductoCarrito) => {return acc + producto.subtotal;}, 0);
            res.render("carrito", { productosCarrito , total});

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
    //            , return res.status(400).json({ message: "El carrito está vacío" });
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