import { Request, Response } from "express";
import { Ejercicio } from "../../database/models/ejercicio";
export class ejerciciosApiController {
    async listaEjercicios(req: Request, res: Response): Promise<void> {
        try {
            const ejercicios = await Ejercicio.findAll();
            console.log(ejercicios)
            res.json(ejercicios);

        } catch (error) {
            console.error('Error al listar Ejercicios:', error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    }
}
export default new ejerciciosApiController();