import { validationResult } from "express-validator";
import { Op } from "sequelize";
import { Request, Response } from "express";
import { Producto } from '../database/models/producto';
import { SessionService } from '../services/serivicioSesion'
import { Json } from "sequelize/types/utils";
import { error } from "console";
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
     * @returns array mapeado agregando la clave/valor cantidad y total ProductoCarrito[]
     * 
     * @example
     * {
        productos: [
            {
            id: ,
            nombre: ,
            descripcion: ,
            precio: ,
            categoriaId: ,
            imagen: '.jpg',
            stock: ,
            cantidad: ,
            subtotal: 
            }
        ],
        resultados: { total: , cantidadDeProductos: '' }
        }
     */
    private async obtenerProductosEnCarrito(req: Request): Promise<{}> {
        const carrito = SessionService.obtenerCarrito(req);
        if (carrito.length === 0) {
            return {
                productos: [],
                resultados: {
                    total: 0,
                    cantidadDeProductos: 0}
            }
        }

        const cantidadDeProductos = carrito.reduce((acc: number, producto) => {
            return acc + producto.cantidad;
        }, 0);
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
        const productosCarrito = productosJson.map((producto: any) => {

            const itemCarrito = carritoParseInt.find((item: any) => item.id_producto == producto.id);
            producto.cantidad = itemCarrito ? itemCarrito.cantidad : 0;
            producto.subtotal = producto.precio * producto.cantidad
            return producto;
        });
        const total = productosCarrito.reduce((acc: number, producto: ProductoCarrito) => { return acc + producto.subtotal; }, 0);

        const resultadoJson = {
            productos: productosCarrito,
            resultados: {
                total: total,
                cantidadDeProductos: cantidadDeProductos
            }
        };
        
        return resultadoJson;
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
            const productosCarrito = await this.obtenerProductosEnCarrito(req);
            res.render("carrito", {
                productosCarrito: productosCarrito,
                showModal: false,
                errors: undefined
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

    public async reservarCompra(req: Request, res: Response) {
        try {
            const errors = (req as any).validationErrors;

            if (errors) {
                const productosCarrito = await this.obtenerProductosEnCarrito(req);
                return res.render('carrito', {
                    productosCarrito: productosCarrito,
                    showModal: true,
                    errors: errors
                });
            }
            // TODO : falta agregar logica para guardar en la base de datos y mostrar la vista de formas de pago (notificar por gmail?)

        } catch (error) {
            console.error("Error al reservar compra:", (error as Error).message);
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