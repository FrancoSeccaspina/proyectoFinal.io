import { Producto } from "../database/models";
import { Op } from "sequelize";
import { SessionService } from '../services/serivicioSesion';
import { Request } from "express";

interface ProductoCarrito {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoriaId: number;
    imagen: string;
    stock: number;
    cantidad: number;
    subtotal: number;
}

interface ResultadoCarrito {
    productos: ProductoCarrito[];
    resultados: {
        total: number;
        cantidadDeProductos: number;
    };
}

/**
 * Obtiene los productos desde la DB filtrando por los ids del carrito 
 * mapea los productos con la cantidad y el total
 * y devuelve un array con los productos mapeados.
 * 
 * @param req 
 * @param carrito
 * @returns array mapeado agregando la clave/valor cantidad y total ResultadoCarrito
 * 
 * @example
 * {
    productos: [
        {
        id: ,
        nombre: ,
        descripcion: ,
        precio: ,
        categoriaId: ,
        imagen: '.jpg',
        stock: ,
        cantidad: ,
        subtotal: 
        }
    ],
    resultados: { 
        total: 0, 
        cantidadDeProductos: '' 
        }
    }
 */
export async function obtenerProductosEnCarrito(req: Request): Promise<ResultadoCarrito> {
    const carrito = SessionService.obtenerCarrito(req);
    if (carrito.length === 0) {
        return {
            productos: [],
            resultados: {
                total: 0,
                cantidadDeProductos: 0
            }
        }
    }

    const cantidadDeProductos = carrito.reduce((acc: number, producto) => acc + producto.cantidad, 0);
    const carritoParseInt = carrito.map((item: any) => ({
        id_producto: parseInt(item.id_producto, 10),
        cantidad: parseInt(item.cantidad, 10)
    }));
    const idsProductosCarrito = carritoParseInt.map((item: any) => item.id_producto);
    const productos = await Producto.findAll({
        where: {
            id: {
                [Op.in]: idsProductosCarrito,
            },
        },
    });
    const productosJson = productos.map((producto: any) => producto.toJSON());
    const productosCarrito = productosJson.map((producto: any) => {
        const itemCarrito = carritoParseInt.find((item: any) => item.id_producto == producto.id);
        producto.cantidad = itemCarrito ? itemCarrito.cantidad : 0;
        producto.subtotal = producto.precio * producto.cantidad
        return producto;
    });
    const total = productosCarrito.reduce((acc: number, producto: ProductoCarrito) => acc + producto.subtotal, 0);

    return {
        productos: productosCarrito,
        resultados: {
            total: total,
            cantidadDeProductos: cantidadDeProductos
        }
    };
}