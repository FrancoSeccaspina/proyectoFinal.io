import { Request, Response } from 'express';
import { GestionPagoProveedores } from '../../database/models/gestion_pago_proveedores';

export class gestionPagoProveedoresApiController {
    async listaGestionPagoProveedores(req: Request, res: Response): Promise<void> {
        try {
            const pagos = await GestionPagoProveedores.findAll({
                order: [['fecha', 'ASC']]
            });
            
            res.json(pagos);
        } catch (error) {
            console.error('Error al listar pagos:', error);
            res.status(500).json({ message: 'Error al obtener los pagos' });
        }
    }

    async crearGestionPagoProveedor(req: Request, res: Response): Promise<void> {
        try {
            const { fecha, ingreso, egreso,  } = req.body;

            if (!fecha || ingreso === undefined || egreso === undefined) {
                res.status(400).json({ success: false, message: "Faltan datos requeridos" });
                return;
            }
            const sobrante = ingreso - egreso;
            const nuevoPago = await GestionPagoProveedores.create({
                fecha,
                ingreso,
                egreso,
                sobrante,
            });

            res.status(201).json({ message: "Pago creado con éxito", pago: nuevoPago });
        } catch (error) {
            console.error('Error al crear el pago:', error);
            res.status(500).json({ message: "Error al crear el pago" });
        }
    }
}
export default new gestionPagoProveedoresApiController();