import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';


interface CarritoAttributes {
    id: number;
    id_usuario: number;
    id_producto: number;
    cantidad: number;
    fecha_agregado: Date;
}

class Carrito extends Model<InferAttributes<Carrito>, InferCreationAttributes<Carrito>> implements CarritoAttributes {
    declare id: CreationOptional<number>;
    declare id_usuario: number;
    declare id_producto: number;
    declare cantidad: number;
    declare fecha_agregado: CreationOptional<Date>;

    static associate(models: any) {
        Carrito.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario',
        });

        Carrito.belongsTo(models.Producto, {
            foreignKey: 'id_producto',
            as: 'producto',
        });
    }
}

const initCarritoModel = (sequelize: Sequelize) => {
    Carrito.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            id_usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_producto: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cantidad: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
            fecha_agregado: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Carrito',
            tableName: 'carrito',
            freezeTableName: true,
            timestamps: false,
        }
    );
};

export { Carrito, initCarritoModel };