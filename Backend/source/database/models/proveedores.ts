import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize';

interface ProveedorAttributes {
    id: number;
    nombre: string;
    apellido: string;
    celular: number;

}

class Proveedor extends Model<InferAttributes<Proveedor>, InferCreationAttributes<Proveedor>> implements ProveedorAttributes {
    declare id: CreationOptional<number>;
    declare nombre: string;
    declare apellido: string;
    declare celular: number;

    static associate(models: any) {
    }

}

const initProveedorModel = (sequelize: Sequelize) => {
    Proveedor.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nombre: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            apellido: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            celular: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Proveedor',
            tableName: 'proveedores',
            freezeTableName: true,
            paranoid: true,
            timestamps: false,
        })
}
export { initProveedorModel, Proveedor };