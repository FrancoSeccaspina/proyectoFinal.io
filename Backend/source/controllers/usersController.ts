import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { Autenticacion, Usuario } from '../database/models';
import bcrypt from 'bcryptjs';
import { Roles } from "../constants/roles";
import { error } from "console";
import { SessionService } from '../services/serivicioSesion'

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

  async showAll(req: Request, res: Response): Promise<Response> {
    try {
      const usuarios = await Usuario.findAll({
        include: {
          model: Autenticacion,
          attributes: ["email"],
        },
      });
      if (usuarios.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Usuarios encontrados",
          usuarios,
        });
      }
      return res.status(404).json({
        success: false,
        message: "No se encontraron usuarios",
      });
    } catch (error) {
      console.error("Error en show:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
      });
    }
  }

  async registrar(req: Request, res: Response): Promise<Response> {
    const transaction = await Usuario.sequelize?.transaction();
    try {
      const reultadosValidacion = validationResult(req);
      const errores = reultadosValidacion.mapped();
      const { apellido, nombre, imagen, email, contrasenia, fecha_nacimiento, celular, aptoMedico, dni } = req.body;

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
          rol: Roles.CLIENTE, // TODO: Cambiar a valor por defecto desde la BD
          imagen,
          id_membresia: 1, // TODO: Cambiar a valor por defecto desde la BD
          fecha_nacimiento,
          celular,
          aptoMedico,
          dni,
        },
        { transaction }
      );

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
      
      console.error("Error: ", (error as Error).message);
      res.status(500).render("error", {
          title: "Error del servidor",
          code: 500,
          message: "Error del servidor",
          description: "Ocurrió un error inesperado durante el registro.",
          error: (error as Error).message
      });
      return res;
    }
  }

  /**
 * Método para manejar el inicio de sesión de un usuario.
 * Verifica las credenciales proporcionadas (email y contraseña) y, si son válidas,
 * guarda los datos del usuario en la sesión. Redirige al dashboard si el usuario es administrador
 * o a la página principal si es un cliente.
 *
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Promise<Response | void>}
 *
 * @example
 * // Ejemplo de datos enviados en el cuerpo de la solicitud:
 * {
 *   "email": "usuario@example.com",
 *   "contrasenia": "password123"
 * }
 *
 * @example
 * // Respuesta en caso de error:
 * {
 *   "error": "Email no registrado",
 *   "oldData": { "email": "usuario@example.com" }
 * }
 */
  async login(req: Request, res: Response): Promise<Response | void> {
    try {
      
      const { email, contrasenia } = req.body;

      const usuarioExistente = await Autenticacion.findOne({ where: { email } });
      if (!usuarioExistente) {
        return res.status(401).render("login", {
          errors: {
            email: { msg: "Email no registrado" }
          },
          oldData: {
            email: req.body.email
        }
        });
      }

      const contraseniaOk = bcrypt.compareSync(contrasenia, usuarioExistente.contrasenia);
      if (!contraseniaOk) {
        return res.status(401).render("login", {
          errors: {
            contrasenia: { msg: "Contraseña incorrecta" }
          },
          oldData: {
            email: req.body.email
        }
        });
      }

      const usuario = await Usuario.findOne({ where: { id: usuarioExistente.id_usuario } });
      if (!usuario) {
        return res.status(401).render("login", {
          errors: {
            email: { msg: "Usuario no encontrado" }
          },
          oldData: {
            email: req.body.email
        }
        });
      }

      SessionService.guardarSessionUsuario(req, {
        id: usuario.id, 
        email: usuarioExistente.email,
        rol: usuario.rol
      });

      console.log("Usuario logueado:", req.session.usuario);
      console.log("obtener usuario logueado:", SessionService.obtenerSessionUsuario(req));
      
      if (usuario.rol === Roles.ADMIN) {
        return res.redirect("http://localhost:3000");
      }
      return res.redirect("/");

    } catch (error) {

      console.error("Error en login:", (error as Error).message);
      return res.status(500).render("error", {
          title: "Error del servidor",
          code: 500,
          message: "Error del servidor",
          description: "Ocurrió un error inesperado durante el inicio de sesión. Por favor, inténtelo de nuevo más tarde.",
          error: (error as Error).message
      });

    }
  }

  async logout(req: Request, res: Response): Promise<Response | void> {
    req.session.destroy(err => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
        console.log("Error al cerrar sesión:", err);
        return res.redirect("/");
      }
      res.redirect("/");
    });
  }

  async softDelete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findOne({ where: { id } });
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }
      await usuario.update({ rol: "Inactivo" }); //nombre del rol para eliminar el usuario
      return res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente",
      });

    } catch (error) {
      console.error("Error al borrar usuario:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { apellido, nombre, rol, imagen, id_membresia, fecha_nacimiento, celular, aptoMedico, dni  } = req.body;
      const usuario = await Usuario.findOne({ where: { id } });
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }
      await usuario.update({
        apellido,
        nombre,
        rol,
        imagen,
        id_membresia,
        fecha_nacimiento,
        celular,
        aptoMedico,
        // dni
        
      });
      return res.status(200).json({
        success: true,
        message: "Usuario actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  }
}
export default new UsuarioController();
