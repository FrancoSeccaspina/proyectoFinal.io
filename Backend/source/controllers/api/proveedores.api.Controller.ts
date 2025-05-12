import { Request, Response } from 'express';
import { Proveedor } from '../../database/models/proveedores';
export class proveedorAPIController {
    async listaProveedores(req: Request, res: Response): Promise<void> {
        try {
            const proveedores = await Proveedor.findAll();
            console.log(proveedores)
            res.json(proveedores);

        } catch (error) {
            console.error('Error al listar proveedores:', error);
            res.status(500).json({ message: 'Error al obtener los proveedores' });
        }
    }
}



export default new proveedorAPIController();