import { Request } from "express";

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

    guardarSessionUsuario(req: Request, usuario: { id: number, email: string, rol: string }) {
        req.session.usuario = usuario;
    },

    usuarioLogeado(req: Request): boolean {
        return !!req.session.usuario;
    }
};
