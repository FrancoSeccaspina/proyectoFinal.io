// src/controllers/usuarioController.ts
import { Request, Response } from "express";
import { Usuario } from '../database/models';

export class UsuarioController {

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const user = await Usuario.findOne({ where: { id: req.params.id } });

      if (user) {
        return res.status(200).json({
          success: true,
          message: "Usuario encontrado",
          user,
        });
      }

      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    } catch (error) {
      console.error("Error en show:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { apellido, nombre, imagen } = req.body;

      const newUser = await Usuario.create({ apellido, nombre, imagen });

      return res.status(201).json({
        success: true,
        message: "Usuario creado",
        user: newUser,
      });
    } catch (error) {
      console.error("Error en create:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error al crear usuario",
      });
    }
  }
}

// Exporta la clase para usarla en el enrutador
export default new UsuarioController();
