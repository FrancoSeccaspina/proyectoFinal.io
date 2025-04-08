import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize';

interface ProductoAttributes {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    stock: number;
}

class Producto extends Model<InferAttributes<Producto>> implements ProductoAttributes {
    declare id: CreationOptional<number>;
    declare nombre: string;
    declare descripcion: string;
    declare precio: number;
    declare imagen: string;
    declare stock: number;

    static associate(models: any) {
    }

}

const initProductoModel = (sequelize: Sequelize) => {
    Producto.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nombre: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            precio: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            imagen: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Producto',
            tableName: 'productos',
            freezeTableName: true,
            paranoid: true,
            timestamps: false,
        })
}
export { initProductoModel, Producto };