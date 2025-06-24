import { Usuario } from '../../database/models/usuario';
import { Request, Response } from 'express';
import { Sequelize, Op, fn, col, where } from 'sequelize';
import { Membresia } from '../../database/models/membresia';
export class membresiaApiController {
    async listaMembresias(req: Request, res: Response): Promise<void> {
        try{
            const membresias = await Membresia.findAll()
            res.status(200).json(membresias)
        }catch (error) {
            console.error('Error al listar membresias:', error);
            res.status(500).json({ message: 'Error al listar membresias, error 500' });
            console.error(error);
        }
    }
}
export default new membresiaApiController();