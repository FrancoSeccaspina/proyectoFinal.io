import { Op } from "sequelize";
import { Request, Response } from "express";
import { SessionService } from '../services/serivicioSesion';
import { EstadosReserva } from '../constants/estadoReserva';
import { Usuario, Reserva, DetalleReserva, Producto } from "../database/models";

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
    /**
     * Obtiene los productos desde la DB filtrando por los ids del carrito 
     * mapea los productos con la cantidad y el total
     * y devuelve un array con los productos mapeados.
     * 
     * @param req 
     * @param carrito
     * @returns array mapeado agregando la clave/valor cantidad y total ResultadoCarrito
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
        resultados: { 
            total: 0, 
            cantidadDeProductos: '' 
            }
        }
     */
    private async obtenerProductosEnCarrito(req: Request): Promise<ResultadoCarrito> {
        const carrito = SessionService.obtenerCarrito(req);
        if (carrito.length === 0) {
            return {
                productos: [],
                resultados: {
                    total: 0,
                    cantidadDeProductos: 0
                }
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
            // TODO: validar que usuario esta logueado y que la cantidad no pase del stock disponible

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

    public async reservarCompra(req: Request, res: Response) {
        try {

            const productosEnCarrito = await this.obtenerProductosEnCarrito(req);
            const usuarioLogueado = SessionService.obtenerSessionUsuario(req);
            if (!usuarioLogueado) {
                throw new Error("Debes iniciar sesión para reservar");
            }

            if (!productosEnCarrito.productos || productosEnCarrito.productos.length === 0) {
                throw new Error("No hay productos en el carrito");
            }

            const usuario = await Usuario.findByPk(usuarioLogueado?.id);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }

            const id_usuario = usuario.id;
            const fechaActual = new Date();
            const total = productosEnCarrito.resultados.total;
            const estadoPendiente = EstadosReserva.PENDIENTE;
            const horaVencimiento = new Date(fechaActual.getTime() + 30 * 60000);

            const reserva = await Reserva.create({
                id_usuario: id_usuario,
                fecha: fechaActual,
                total: total,
                estado: estadoPendiente,
                vencimiento: horaVencimiento
            });

            productosEnCarrito.productos.forEach(async (producto: ProductoCarrito) => {
                const id_producto = producto.id;
                const cantidad = producto.cantidad;
                const id_reserva = reserva.id_reserva;

                await DetalleReserva.create({
                    id_producto: id_producto,
                    cantidad: cantidad,
                    id_reserva: id_reserva
                });
            });

            return res.redirect("/carrito/mostrar/reservas");

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

    public async mostrarReservas(req: Request, res: Response) {
        try {
            const usuarioLogueado = SessionService.obtenerSessionUsuario(req);
            if (!usuarioLogueado) {
                throw new Error("Debes iniciar sesión para ver tus reservas");
            }

            const reserva = await Reserva.findOne({
                where: { id_usuario: usuarioLogueado.id },
                order: [['id_reserva', 'DESC']]
            });

            if (!reserva) {
                return res.render("reservaDetail", { reserva: null, detalleReserva: [] });
            }

            const reservaPlain = reserva.get({ plain: true });
            const detalleReserva = await DetalleReserva.findAll({
                where: { id_reserva: reservaPlain.id_reserva },
                include: [{
                    model: Producto,
                    attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen']
                }]
            });
            const detalleReservaPlain = detalleReserva.map(detalle => detalle.get({ plain: true }));

            res.render("reservaDetail", {
                reserva: reservaPlain,
                detalleReserva: detalleReservaPlain
            });
            
        } catch (error) {
            console.error("Error al mostrar reservas:", (error as Error).message);
            res.status(500).render("error", {
                title: "Error del servidor",
                code: 500,
                message: "Error al mostrar reservas",
                description: "Ocurrió un error inesperado.",
                error: (error as Error).message
            });
        }
    }
}

export default new carritoController();
