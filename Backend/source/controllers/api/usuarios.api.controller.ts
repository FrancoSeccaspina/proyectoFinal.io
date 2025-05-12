import { Request, Response } from 'express';
import { Usuario } from '../../database/models/usuario';
import { error } from 'console';
export class usuariosAPIController {
    async listaUsuarios(req: Request, res: Response): Promise<void> {
        try {
            const usuarios = await Usuario.findAll();
            console.log(usuarios)
            res.json(usuarios);

        } catch (error) {
            console.error('Error al listar usuarios:', error);
            res.status(500).json({ message: 'Error al obtener los usuarios' });
        }
    }
}



export default new usuariosAPIController();