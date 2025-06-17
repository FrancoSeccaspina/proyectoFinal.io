import { Response } from 'express';
import { Transaccion } from '../../database/models/transaccion';
import { Sequelize } from 'sequelize';

export class TransaccionApiController {
    public async listaTransacciones(res: Response) {
        try {
            const transacciones = await Transaccion.findAll({
                order: [['fecha', 'DESC']],
            })
            return res.status(200).json(transacciones);

        } catch (error) {
            console.error('Error al listar transacciones:', error);
            return res.status(500).json({ message: 'Error al listar transacciones' });
        }
    }

    /**
     * Registra una nueva transacción en la base de datos.
     * @param tipo Tipo de transacción (ingreso, egreso).
     * @param monto Monto de la transacción.
     * @param origen Origen de la transacción (por ejemplo, 'reserva', 'producto').
     * @param id_origen ID del origen de la transacción (por ejemplo, ID de reserva o producto).
     * @returns Respuesta HTTP con el estado de la operación.
     */
    public async registrartransaccion(tipo: string, monto: number, origen: string, id_origen: number, res: Response) {
        try {
            Transaccion.create({
                tipo,
                monto,
                fecha: new Date(),
                origen,
                id_origen
            })
            return res.status(201).json({ message: 'Transacción registrada exitosamente' });

        } catch (error) {
            console.error('Error al registrar transacción:', error);
            return res.status(500).json({ message: 'Error al registrar transacción' });
        }
    }
}

export default new TransaccionApiController();