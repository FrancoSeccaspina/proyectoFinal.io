import transaccionApiController from './transaccion.api.Controller';
import { TipoTransaccion, OrigenTransaccion } from '../../constants/tipoTransacciones'
import { Request, Response } from 'express';
import { Reserva } from '../../database/models/reserva';
import { Producto } from '../../database/models/producto';
import { Usuario } from '../../database/models/usuario';
import { DetalleReserva } from '../../database/models/detalleReserva';
import { EstadosReserva } from '../../constants/estadoReserva';
import { Sequelize, Op, fn, col, where } from 'sequelize';
export class reservaApiController {
    async listaReservas(req: Request, res: Response): Promise<void> {
        try {
            const reservas = await Reserva.findAll({
                include: [
                    {
                        model: DetalleReserva,
                        include: [
                            {
                                model: Producto
                            }
                        ]
                    },
                    {
                        model: Usuario,
                        attributes: ['id', 'nombre', 'apellido']
                    }
                ],
                order: [['fecha', 'DESC']],
            });

            res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al listar reservas:', error);
            res.status(500).json({ message: 'Error al listar reservas, error 500' });
        }
    }

    async confirmarReserva(req: Request, res: Response) {
        try {
            const idReserva = parseInt(req.params.id, 10);

            if (isNaN(idReserva)) {
                return res.status(400).json({ message: "ID de reserva inválido" });
            }

            const reserva = await Reserva.findByPk(idReserva, {
                include: [{ model: DetalleReserva }]
            });

            if (!reserva) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }

            if (reserva.estado !== EstadosReserva.PENDIENTE) {
                const detalles = reserva.DetalleReservas || [];
                await Promise.all(detalles.map(detalle =>
                    Producto.decrement(
                        { stock: detalle.cantidad },
                        { where: { id: detalle.id_producto } }
                    )
                ));
            }

            await reserva.update({ estado: EstadosReserva.CONFIRMADO });


            transaccionApiController.registrartransaccion(
                TipoTransaccion.INGRESO, /* tipo */
                reserva.total, /* monto */
                OrigenTransaccion.CARRITO, /* origen */
                reserva.id_reserva, /* id_origen */
            );

            const reservas = await Reserva.findAll({
                include: [
                    {
                        model: DetalleReserva,
                        include: [
                            {
                                model: Producto
                            }
                        ]
                    },
                    {
                        model: Usuario,
                        attributes: ['id', 'nombre', 'apellido']
                    }
                ],
                order: [['fecha', 'DESC']],
            });

            return res.status(200).json({
                message: "Reserva confirmada correctamente",
                reserva: reservas
            });

        } catch (error) {
            console.error("Error al confirmar reserva:", (error as Error).message);
            return res.status(500).json({ message: "Error al confirmar reserva" });
        }
    }

    async cancelarReserva(req: Request, res: Response) {
        try {
            const idReserva = parseInt(req.params.id, 10);

            if (isNaN(idReserva)) {
                return res.status(400).json({ message: "ID de reserva inválido" });
            }

            const reserva = await Reserva.findByPk(idReserva, {
                include: [{ model: DetalleReserva }]
            });

            if (!reserva) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }

            if (reserva.estado !== EstadosReserva.CANCELADO) {
                await reserva.update({ estado: EstadosReserva.CANCELADO });
            }

            const detalles = reserva.DetalleReservas || [];
            await Promise.all(detalles.map(detalle =>
                Producto.increment(
                    { stock: detalle.cantidad },
                    { where: { id: detalle.id_producto } }
                )
            ));

            const reservasActualizadas = await Reserva.findAll({
                include: [
                    {
                        model: DetalleReserva,
                        include: [{ model: Producto }]
                    },
                    {
                        model: Usuario,
                        attributes: ['id', 'nombre', 'apellido']
                    }
                ]
            });

            return res.status(200).json({
                message: "Reserva cancelada correctamente",
                reserva: reservasActualizadas
            });

        } catch (error) {
            console.error("Error al cancelar reserva:", (error as Error).message);
            return res.status(500).json({ message: "Error al cancelar reserva" });
        }
    }

    async estadisticasPorProducto(req: Request, res: Response): Promise<void> {
        try {
            const { mes, anio } = req.query;

            // Filtro por fecha si se pasa mes y año
            let whereReserva: any = {};
            if (mes && anio) {
                whereReserva = {
                    [Op.and]: [
                        where(fn('MONTH', col('Reserva.fecha')), Number(mes)),
                        where(fn('YEAR', col('Reserva.fecha')), Number(anio))
                    ]
                };
            }

            const reservas = await DetalleReserva.findAll({
                attributes: ['id_producto', 'cantidad', 'subtotal'],
                include: [
                    {
                        model: Reserva,
                        attributes: ['fecha'],
                        where: whereReserva
                    }
                ],
                order: [[Reserva, 'fecha', 'DESC']]
            });

            res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al obtener estadísticas por producto:', error);
            res.status(500).json({
                message: 'Error al obtener estadísticas por producto',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
    async filtrarPorFecha(req: Request, res: Response): Promise<void> {
        try {
            const { fecha } = req.query;
            if (!fecha || typeof fecha !== 'string') {
                res.status(400).json({ message: 'Fecha inválida' });
                return;
            }

            const whereFecha = { fecha: { [Op.eq]: fecha } };

            const reservas = await Reserva.findAll({
                where: whereFecha,
                include: [
                    {
                        model: DetalleReserva,
                        include: [{ model: Producto }]
                    },
                    {
                        model: Usuario,
                        attributes: ['id', 'nombre', 'apellido']
                    }
                ],
                order: [['fecha', 'DESC']],
            });

            res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al filtrar:', error);
            res.status(500).json({ message: 'Error al filtrar' });
        }
    }

    async filtrarPorEstado(req: Request, res: Response): Promise<void> {
        try {
            const { estado } = req.query;
            const whereEstado = { estado: { [Op.eq]: estado } };

            const reservas = await Reserva.findAll({
                where: whereEstado,
                include: [
                    {
                        model: DetalleReserva,
                        include: [{ model: Producto }]
                    },
                    {
                        model: Usuario,
                        attributes: ['id', 'nombre', 'apellido']
                    }
                ],
                order: [['fecha', 'DESC']],
            });

            res.status(200).json(reservas);
        } catch (error) {
            console.error('Error al filtrar:', error);
            res.status(500).json({ message: 'Error al filtrar' });
        }
    }
}

export default new reservaApiController();