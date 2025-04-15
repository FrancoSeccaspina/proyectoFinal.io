import { validationResult } from "express-validator";
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

  async save(req: Request, res: Response): Promise<Response> {
    const transaction = await Usuario.sequelize?.transaction();
    try {
      const reultadosValidacion = validationResult(req);
      const errores = reultadosValidacion.mapped();
      const { apellido, nombre, imagen, email, contrasenia, fecha_nacimiento } = req.body;

      const usuarioExistente = await Autenticacion.findOne({ where: { email } });
      if (usuarioExistente) {
        console.log('El email ya existe')
        res.render('register', {
          errorEmail: { email: { msg: 'Email ya registrado' } },
          oldData: req.body,
          errors: errores
        })
        return res
      }

      if (!reultadosValidacion.isEmpty()) {
        res.render('register', {
          errorEmail: { email: { msg: '' } },
          oldData: req.body,
          errors: errores
        })
        return res
      }

      const nuevoUsuario = await Usuario.create(
        {
          apellido,
          nombre,
          rol: "cliente", // TODO: definir nombre de rol en una variable de entorno/enums
          imagen,
          fecha_nacimiento
        },
        { transaction }
      );

      // TODO: agregar el numero de vueltas en una variable de entorno
      const hashedPassword = bcrypt.hashSync(contrasenia, 10);
      await Autenticacion.create(
        {
          email: email,
          contrasenia: hashedPassword,
          id_usuario: nuevoUsuario.id,
        },
        { transaction }
      );

      await transaction?.commit();

      res.redirect('/login')
      return res

    } catch (error) {

      await transaction?.rollback();
      console.error("Error en register:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, contrasenia } = req.body;
      const usuarioExistente = await Autenticacion.findOne({ where: { email } });
      if (!usuarioExistente) {
        return res.status(401).json({
          success: false,
          message: "Datos incorrectos",
        });
      }
      const verificarContrasenia = bcrypt.compareSync(contrasenia, usuarioExistente.contrasenia);
      if (!verificarContrasenia) {
        return res.status(401).json({
          success: false,
          message: "Contraseña incorrecta",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Usuario logueado correctamente",
        usuarioExistente,
      });
    } catch (error) {
      console.error("Error en login:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  }

}
export default new UsuarioController();
