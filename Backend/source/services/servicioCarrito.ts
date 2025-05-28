import { Producto } from "../database/models";
import { Op } from "sequelize";
import { SessionService } from './serivicioSesion';
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
 * 
 * Obtiene los productos desde la DB filtrando por los ids de los productos del carrito en sesion
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
        };
    }

    const carritoParseInt = carrito.map((item: any) => ({
        id_producto: parseInt(item.id_producto, 10),
        cantidad: parseInt(item.cantidad, 10)
    }));

    const idsProductosCarrito = carritoParseInt.map(item => item.id_producto);
    const cantidadDeProductos = carritoParseInt.reduce((acc, item) => acc + item.cantidad, 0);
    const cantidadPorId = new Map(carritoParseInt.map(item => [item.id_producto, item.cantidad]));

    const productos = await Producto.findAll({
        where: { id: { [Op.in]: idsProductosCarrito } }
    });

    let total = 0;
    const productosCarrito = productos.map((producto: any) => {
        const plain = producto.get({ plain: true });
        const cantidad = cantidadPorId.get(plain.id) || 0;
        const subtotal = plain.precio * cantidad;
        total += subtotal;
        return { ...plain, cantidad, subtotal };
    });

    return {
        productos: productosCarrito,
        resultados: {
            total,
            cantidadDeProductos
        }
    };
}