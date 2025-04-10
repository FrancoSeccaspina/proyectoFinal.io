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
  // async create(req: Request, res: Response): Promise<Response> {
    
  //   const transaction = await Usuario.sequelize?.transaction();
    
  //   try {
  //     const { apellido, nombre, imagen,  email, contrasenia} = req.body;
  //     if (!apellido || !nombre || !email || !contrasenia) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Faltan campos obligatorios",
  //       });
  //     }

      
  //     const hashedPassword = await bcrypt.hash(contrasenia, 10);
  //     const newAuth = await Autenticacion.create(
  //       {
  //         email,
  //         contrasenia: hashedPassword,
  //       },
  //       { transaction }
  //     );

  //     const nuevoUsuario = await Usuario.create(
  //       { apellido, nombre, imagen },
  //       { transaction });


  //     return res.status(201).json({
  //       success: true,
  //       message: "Usuario creado",
  //       user: newUser,
  //     });
  //   } catch (error) {
  //     console.error("Error en create:", (error as Error).message);
  //     return res.status(500).json({
  //       success: false,
  //       message: "Error al crear usuario",
  //     });
  //   }
  // }
}

// Exporta la clase para usarla en el enrutador
export default new UsuarioController();
