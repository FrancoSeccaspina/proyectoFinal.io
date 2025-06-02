import { Request, Response } from "express";
import { SessionService } from '../services/serivicioSesion';
import { obtenerProductosEnCarrito } from '../services/servicioCarrito';
import { EstadosReserva } from '../constants/estadoReserva';
import { sequelize } from "../database/models";
import { Usuario } from "../database/models/usuario";
import { Reserva } from "../database/models/reserva";
import { DetalleReserva } from "../database/models/detalleReserva";
import { Producto } from "../database/models/producto";
import { Op } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

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

class reservaController {
    /***
     * Tiempo de vida de cada reserva .env TIEMPO_CONTROL_STOCK=30
     */
    public async reservarCompra(req: Request, res: Response) {
        const t = await sequelize.transaction();
        try {
            const productosEnCarrito = await obtenerProductosEnCarrito(req);
            const usuarioLogueado = SessionService.obtenerSessionUsuario(req);
            if (!usuarioLogueado) {
                // TODO : agregar mensaje en vista
                throw new Error("Debes iniciar sesión para reservar");
            }

            if (!productosEnCarrito.productos || productosEnCarrito.productos.length === 0) {
                // TODO : agregar mensaje en vista
                throw new Error("No hay productos en el carrito");
            }

            const usuario = await Usuario.findByPk(usuarioLogueado?.id);
            if (!usuario) {
                throw new Error("Usuario no encontrado");
            }
            const tiempoControlStock = parseInt(process.env.TIEMPO_CONTROL_STOCK || "0", 10);
            const id_usuario = usuario.id;
            const fechaActual = new Date();
            const total = productosEnCarrito.resultados.total;
            const estadoPendiente = EstadosReserva.PENDIENTE;
            const horaVencimiento = new Date(fechaActual.getTime() + tiempoControlStock * 60000);

            const reserva = await Reserva.create({
                id_usuario: id_usuario,
                fecha: fechaActual,
                total: total,
                estado: estadoPendiente,
                vencimiento: horaVencimiento
            });

            await Promise.all(productosEnCarrito.productos.map(async (producto: ProductoCarrito) => {
                await Producto.decrement(
                    { stock: producto.cantidad },
                    { where: { id: producto.id }, transaction: t }
                );
                await DetalleReserva.create({
                    id_producto: producto.id,
                    cantidad: producto.cantidad,
                    id_reserva: reserva.id_reserva,
                    subtotal: producto.subtotal
                }, { transaction: t });
            }));

            await t.commit();
            SessionService.limpiarCarrito(req)
            return res.redirect("/reserva/mostrar/ultimaReserva");

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

    public async mostrarUltimaReserva(req: Request, res: Response) {
        try {
            const usuarioLogueado = SessionService.obtenerSessionUsuario(req);
            if (!usuarioLogueado) {
                // TODO : renderizar mensaje a la vista
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

    public async mostrarReservaPorId(req: Request, res: Response) {
        try {
            const usuarioLogueado = SessionService.obtenerSessionUsuario(req);
            if (!usuarioLogueado) {
                // TODO : renderizar mensaje a la vista
                throw new Error("Debes iniciar sesión para ver tus reservas");
            }

            const idReserva = req.params.id;

            const reserva = await Reserva.findOne({
                where: { id_reserva: idReserva, id_usuario: usuarioLogueado.id }
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

    public async mostrarReservas(req: Request, res: Response) {
        try {
            const usuarioLogueado = SessionService.obtenerSessionUsuario(req);
            if (!usuarioLogueado) {
                // TODO : renderizar mensaje a la vista
                throw new Error("Debes iniciar sesión para ver tus reservas");
            }

            const reservas = await Reserva.findAll({
                where: { id_usuario: usuarioLogueado.id },
                order: [['id_reserva', 'DESC']]
            });

            if (!reservas || reservas.length === 0) {
                return res.render("reservas", { reservas: [] });
            }

            const reservasConDetalles = await Promise.all(reservas.map(async (reserva) => {
                const reservaPlain = reserva.get({ plain: true });
                const detalleReserva = await DetalleReserva.findAll({
                    where: { id_reserva: reservaPlain.id_reserva },
                    include: [{
                        model: Producto,
                        attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen']
                    }]
                });
                const detalleReservaPlain = detalleReserva.map(detalle => detalle.get({ plain: true }));
                return {
                    ...reservaPlain,
                    detalleReserva: detalleReservaPlain
                };
            }));

            res.render("reservas", { reservas: reservasConDetalles });

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

    public async cancelarReservaPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const id_reserva = parseInt(id, 10);

            const reserva = await Reserva.findOne({
                where: { id_reserva },
                include: [{
                    model: DetalleReserva,
                    attributes: ['id_producto', 'cantidad']
                }]
            });

            if (reserva && reserva.DetalleReservas) {
                await Promise.all(reserva.DetalleReservas.map(detalle =>
                    Producto.increment(
                        { stock: detalle.cantidad },
                        { where: { id: detalle.id_producto } }
                    )
                ));

                await Reserva.update(
                    { estado: EstadosReserva.CANCELADO },
                    { where: { id_reserva } }
                );
            }

            res.redirect('/reserva/mostrar/reservas');
        } catch (error) {
            console.error("Error al cancelar reserva:", (error as Error).message);
            res.status(500).json({
                message: "Error al cancelar reserva",
                error: (error as Error).message
            });
        }
    }

    public async devolverStockReservasVencidas() {
        const t = await sequelize.transaction();
        try {
            const reservasVencidas = await Reserva.findAll({
                where: {
                    vencimiento: { [Op.lt]: new Date() },
                    estado: EstadosReserva.PENDIENTE
                },
                include: [{
                    model: DetalleReserva,
                }],
                transaction: t
            });

            for (const reserva of reservasVencidas) {
                const detalles = reserva.DetalleReservas || [];

                for (const detalle of detalles) {
                    await Producto.increment(
                        { stock: detalle.cantidad },
                        { where: { id: detalle.id_producto }, transaction: t }
                    );
                }

                await reserva.update(
                    { estado: EstadosReserva.EXPIRADO },
                    { transaction: t }
                );
            }
            await t.commit();

        } catch (error) {
            await t.rollback();
            console.error("Error al devolver stock de reservas vencidas:", (error as Error).message);
        }
    }
}

export default new reservaController();
