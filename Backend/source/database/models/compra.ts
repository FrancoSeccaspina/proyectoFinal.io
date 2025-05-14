import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

interface CompraAttributes {
    id: number;
    id_usuario: number;
    fecha_compra: Date;
    total: number;
}

class Compra extends Model<InferAttributes<Compra>, InferCreationAttributes<Compra>> implements CompraAttributes {
    declare id: CreationOptional<number>;
    declare id_usuario: number;
    declare fecha_compra: CreationOptional<Date>;
    declare total: CreationOptional<number>;

    static associate(models: any) {
        Compra.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario',
        });
    }
}

const initCompraModel = (sequelize: Sequelize) => {
    Compra.init(
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
            fecha_compra: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            total: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Compra',
            tableName: 'compras',
            freezeTableName: true,
            timestamps: false,
        }
    );
};

export { Compra, initCompraModel };