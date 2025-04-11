import { Request, Response } from "express";
import { Autenticacion, Usuario } from '../database/models';
import bcrypt from 'bcryptjs';

export class UsuarioController {

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const usuario = await Usuario.findOne({ where: { id: req.params.id } });

      if (usuario) {
        return res.status(200).json({
          success: true,
          message: "Usuario encontrado",
          usuario,
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
  async register(req: Request, res: Response): Promise<Response> {
    const transaction = await Usuario.sequelize?.transaction();
    try {
      const { apellido, nombre, imagen, email, contrasenia } = req.body;
  
      if (!apellido || !nombre || !imagen || !email || !contrasenia) {
        return res.status(400).json({
          success: false,
          message: "Faltan campos obligatorios",
        });
      }
  
      const usuarioExistente = await Autenticacion.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({
          success: false,
          message: "El usuario ya existe",
        });
      }
  
      const nuevoUsuario = await Usuario.create(
        {
          apellido,
          nombre,
          rol: "cliente", // TODO: definir nombre de rol en una variable de entorno
          imagen,
        },
        { transaction }
      );
  
      // TODO: agregar el numero de vueltas en una variable de entorno
      const hashedPassword = bcrypt.hashSync(contrasenia, 10); 
      await Autenticacion.create(
        {
          email,
          contrasenia: hashedPassword,
          id_usuario: nuevoUsuario.id,
        },
        { transaction }
      );
  
      await transaction?.commit();
      return res.status(201).json({
        success: true,
        message: "Usuario registrado correctamente",
        usuario: nuevoUsuario,
      });

    } catch (error) {
      await transaction?.rollback();
      console.error("Error en register:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }
}
export default new UsuarioController();
