/*import { Request } from "express";

declare module "express-session" {
    interface SessionData {
        carrito?: Array<{ id_producto: number; cantidad: number }>;
    }
}

declare module "express-session" {
    interface SessionData {
        usuario?: {
            id: number;
            email: string;
            rol: string;
        };
    }
}

export const SessionService = {
    obtenerCarrito(req: Request) {
        if (!req.session.carrito) {
            req.session.carrito = [];
        }
        return req.session.carrito;
    },

    agregarProductoAlCarrito(req: Request, id_producto: number, cantidad: number) {
        const carrito = this.obtenerCarrito(req);
        const productoExistente = carrito.find(producto => producto.id_producto === id_producto);

        if (productoExistente) {
        const cantidadActual = parseInt(productoExistente.cantidad.toString(), 10);
        const cantidadNueva = parseInt(cantidad.toString(), 10);

        const cantidadFinal = cantidadActual + cantidadNueva;
        productoExistente.cantidad = cantidadFinal;

        } else {
            const nuevoProducto = { id_producto, cantidad };
            carrito.push(nuevoProducto);
        }
        req.session.carrito = carrito;
        
    },

    borrarProductoDelCarrito(req: Request, id_producto: number) {
        const carrito = this.obtenerCarrito(req);
        const nuevoCarrito = carrito.filter(producto => producto.id_producto != id_producto);
        req.session.carrito = nuevoCarrito;
    },

    limpiarCarrito(req: Request) {
        req.session.carrito = [];
    },

    iniciarSessionUsuario(req: Request, usuario: { id: number, email: string, rol: string }) {
        req.session.usuario = usuario;
    },

    terminarSessionUsuario(req: Request) {
        req.session.destroy(err => {
            if (err) {
                console.error("Error al cerrar sesión:", err);
                console.log("Error al cerrar sesión:", err);
            }
        });
    },

    obtenerSessionUsuario(req: Request) {
        return req.session.usuario;
    },
    
    usuarioLogeado(req: Request): boolean {
        return !!req.session.usuario;
    }
};*/
import { Request } from "express";

declare module "express-session" {
  interface SessionData {
    carrito?: Array<{ id_producto: number; cantidad: number }>;
    usuario?: {
      id: number;
      email: string;
      rol: string;
    };
    usuarioLogueado?: {
      id: number;
      email: string;
      rol: string;
      nombre?: string;
      apellido?: string;
      celular?: string;
      fecha_nacimiento?: string;
      imagen?: string;
      aptoMedico?: string; // Este es el campo nuevo
      fecha_fin_cuota?: string;         // ✅ Nuevo campo
      estado_membresia?: string;        // ✅ Nuevo campo
    };
  }
}

export const SessionService = {
  obtenerCarrito(req: Request) {
    if (!req.session.carrito) {
      req.session.carrito = [];
    }
    return req.session.carrito;
  },

  agregarProductoAlCarrito(req: Request, id_producto: number, cantidad: number) {
    const carrito = this.obtenerCarrito(req);
    const productoExistente = carrito.find(producto => producto.id_producto === id_producto);

    if (productoExistente) {
      const cantidadActual = parseInt(productoExistente.cantidad.toString(), 10);
      const cantidadNueva = parseInt(cantidad.toString(), 10);
      productoExistente.cantidad = cantidadActual + cantidadNueva;
    } else {
      carrito.push({ id_producto, cantidad });
    }
    req.session.carrito = carrito;
  },

  borrarProductoDelCarrito(req: Request, id_producto: number) {
    const carrito = this.obtenerCarrito(req);
    req.session.carrito = carrito.filter(producto => producto.id_producto != id_producto);
  },

  limpiarCarrito(req: Request) {
    req.session.carrito = [];
  },

  iniciarSessionUsuario(req: Request, usuario: {
    id: number;
    email: string;
    rol: string;
    nombre?: string;
    apellido?: string;
    celular?: string;
    fecha_nacimiento?: string;
    imagen?: string;
    aptoMedico?: string;
    fecha_fin_cuota?: string;
    estado_membresia?: string;  
  }) {
    req.session.usuario = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    };

    req.session.usuarioLogueado = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      celular: usuario.celular,
      fecha_nacimiento: usuario.fecha_nacimiento,
      imagen: usuario.imagen || "default.png",
      aptoMedico: usuario.aptoMedico, // <-- corregido
      fecha_fin_cuota: usuario.fecha_fin_cuota || undefined,
      estado_membresia: usuario.estado_membresia || 'SIN DATOS'
    };
  },

  terminarSessionUsuario(req: Request) {
    req.session.destroy(err => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
      }
    });
  },

  obtenerSessionUsuario(req: Request) {
    return req.session.usuario;
  },

  usuarioLogeado(req: Request): boolean {
    return !!req.session.usuario;
  }
};
