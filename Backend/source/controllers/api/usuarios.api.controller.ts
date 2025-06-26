import { Request, response, Response } from 'express';
import { Usuario } from '../../database/models/usuario';
import { Autenticacion } from '../../database/models/autenticacion';
import { error } from 'console';
import bcrypt from 'bcryptjs';
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
  async buscarUsuarioPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        console.log(usuario)
        res.json(usuario);
      } else {
        res.status(404).json({ message: 'usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      res.status(500).json({ message: 'Error al obtener el usuario' });
    }
  }
  async editarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nombre, apellido, celular, aptoMedico, dni } = req.body;
      const usuario = await Usuario.findByPk(id);
      if (usuario) {
        await usuario.update({ nombre, apellido, celular, aptoMedico, dni });
        res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error al editar el Usuario:', error);
      res.status(500).json({ message: 'Error al editar el Usuario' });
    }
  }
  async update(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { apellido, nombre, rol, id_membresia, fecha_nacimiento, celular, dni, email } = req.body;
  
      const usuario = await Usuario.findOne({ where: { id } });
      if (!usuario) {
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
      }
  
      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
  
      const imagen = files?.imagen?.[0]?.filename;
      const aptoMedico = files?.aptomedico?.[0]?.filename;
      console.log("Body:", req.body);
      console.log("Files:", req.files);

  
      await usuario.update({
        apellido,
        nombre,
        rol,
        id_membresia,
        fecha_nacimiento,
        celular,
        dni,
        ...(imagen && { imagen }),
        ...(aptoMedico && { aptoMedico }),
      });
  
      // Actualizar sesión si corresponde
      if (req.session.usuarioLogueado) {
        Object.assign(req.session.usuarioLogueado, {
          apellido,
          nombre,
          celular,
          email,
          fecha_nacimiento,
          ...(imagen && { imagen }),
          ...(aptoMedico && { aptomedico: aptoMedico }),
        });
      }
  
      // 🔁 Redireccionar al perfil
      return res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario });
      
  
    } catch (error) {
      console.error("Error al actualizar usuario:", (error as Error).message);
      return res.status(500).json({ success: false, message: "Error al actualizar usuario" });
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findOne({ where: { id } });

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado"
        });
      }

      await usuario.destroy();

      return res.status(200).json({
        success: true,
        message: "Usuario eliminado con éxito"
      });

    } catch (error) {
      console.error("Error en deleteUsuario:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error interno del servidor"
      });
    }
  }
  /*async crearCuota(req: Request, res: Response): Promise<Response> {
  try {
    const { usuarioId, monto, fecha } = req.body;

    if (!usuarioId || !monto || !fecha) {
      return res.status(400).json({
        success: false,
        message: "Faltan datos requeridos"
      });
    }

    const nuevaCuota = await Cuota.create({
      usuarioId,
      monto,
      fecha
    });

    return res.status(201).json({
      success: true,
      message: "Cuota creada con éxito",
      cuota: nuevaCuota
    });

  } catch (error) {
    console.error("Error en crearCuota:", (error as Error).message);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor"
    });
  }
}*/

  async changePassword(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { constrasenia } = req.body;
      const usuario = await Autenticacion.findOne({ where: { id_usuario: id } });
      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado"
        });
      }

      const hashedPassword = bcrypt.hashSync(constrasenia, 10);
      await usuario?.update({ contrasenia: hashedPassword });

      return res.status(200).json({
        success: true,
        message: "Contraseña actualizada correctamente",
      });
    } catch (error) {
      console.error("Error al cambiar la contraseña:", (error as Error).message);
      return res.status(500).json({
        success: false,
        message: "Error al cambiar la contraseña"
      });
    }
  }

}



export default new usuariosAPIController();