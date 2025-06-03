import { Request, Response } from 'express';
import { Reserva } from '../../database/models/reserva';
import { Producto } from '../../database/models/producto';
import { Usuario } from '../../database/models/usuario';
import { DetalleReserva } from '../../database/models/detalleReserva';
import { Sequelize } from 'sequelize';
import { EstadosReserva } from '../../constants/estadoReserva'
export class reservaApiController {
    async listaProductos(req: Request, res: Response): Promise<void> {
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
            res.status(500).json({ message: 'Error al listar reservas' });
        }
    }

    public async confirmarReserva(req: Request, res: Response) {
        try {
            const idReserva = parseInt(req.params.id, 10);
            if (isNaN(idReserva)) {
                return res.status(400).json({ message: "ID de reserva inválido" });
            }

            const [updatedRows] = await Reserva.update(
                { estado: EstadosReserva.CONFIRMADO },
                { where: { id_reserva: idReserva } }
            );

            if (updatedRows === 0) {
                return res.status(404).json({ message: "Reserva no encontrada" });
            }

            return res.status(200).json({ message: "Reserva confirmada correctamente" });
        } catch (error) {
            console.error("Error al confirmar reserva:", (error as Error).message);
            return res.status(500).json({ message: "Error al confirmar reserva" });
        }
    }
    // async buscarProductosPorId(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { id } = req.params;
    //         const producto = await Producto.findByPk(id);
    //         if (producto) {
    //             console.log(producto)
    //             res.json(producto);
    //         } else {
    //             res.status(404).json({ message: 'Producto no encontrado' });
    //         }
    //     } catch (error) {
    //         console.error('Error al buscar el producto:', error);
    //         res.status(500).json({ message: 'Error al obtener el producto' });
    //     }
    // }
    // async editarProducto(req: Request, res: Response): Promise<void> {

    //     try {
    //         const { id } = req.params;
    //         const { nombre, descripcion, precio, stock } = req.body;
    //         const producto = await Producto.findByPk(id);

    //         if (producto) {
    //             const nuevaImagen = req.file ? req.file.filename : producto.imagen;
    //             await producto.update({ nombre, descripcion, precio, imagen: nuevaImagen, stock });
    //             res.status(200).json({ message: 'Producto actualizado exitosamente', producto });
    //         } else {
    //             res.status(404).json({ message: 'Producto no encontrado' });
    //         }
    //     } catch (error) {
    //         console.error('Error al editar el producto:', error);
    //         res.status(500).json({ message: 'Error al editar el producto' });
    //     }
    // }
    // async crearProducto(req: Request, res: Response): Promise<Response> {
    //     const imagen = req.file?.filename;

    //     try {
    //         const { nombre, precio, categoriaId, descripcion, stock } = req.body;

    //         if (!nombre || !descripcion || !precio || !stock || !imagen) {
    //             return res.status(400).json({ success: false, message: "Faltan datos requeridos" });
    //         }

    //         const nuevoProducto = await Producto.create({
    //             nombre,
    //             descripcion,
    //             precio,
    //             categoriaId,
    //             imagen,
    //             stock
    //         });

    //         return res.status(201).json({
    //             success: true,
    //             message: 'Producto creado exitosamente',
    //             producto: nuevoProducto,
    //         });
    //     } catch (error) {
    //         console.error("Error en el crearProducto:", error);
    //         return res.status(500).json({ success: false, message: "Error interno en el servidor" });
    //     }
    // }

    // async delete(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const { id } = req.params;
    //         const producto = await Producto.findOne({ where: { id } });

    //         if (!producto) {
    //             return res.status(404).json({
    //                 success: false,
    //                 message: "Producto no encontrado",
    //             });
    //         }

    //         await producto.destroy();

    //         return res.status(200).json({
    //             success: true,
    //             message: "Producto eliminado con éxito",
    //         });
    //     } catch (error) {
    //         console.error("Error en deleteProducto:", (error as Error).message);
    //         return res.status(500).json({
    //             success: false,
    //             message: "Error interno del servidor",
    //         });
    //     }
    // }
}

export default new reservaApiController();