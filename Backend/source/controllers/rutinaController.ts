import { Request, Response } from 'express';
import { Ejercicio } from '../database/models/ejercicio';

export class ejercicioController {








    async listaEjercicios(req: Request, res: Response): Promise<void> {
            try {
                const ejercicios = await Ejercicio.findAll();
                console.log(ejercicios)
                res.render('ejercicos', {ejercicios})
            } catch (error) {
                console.error('Error al listar ejercicos:', error);
                res.status(500).json({ message: 'Error al obtener los ejercicios' });
                
            }
    }
}