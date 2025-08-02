import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    } from 'sequelize';
interface GestionPagoProveedoresAttributes {
    id: number;
    fecha: Date;
    ingreso: number;
    egreso: number;
    sobrante: number;
    }
class GestionPagoProveedores extends Model<InferAttributes<GestionPagoProveedores>, InferCreationAttributes<GestionPagoProveedores>> implements GestionPagoProveedoresAttributes {
    declare id: CreationOptional<number>;
    declare fecha: Date;
    declare ingreso: number;
    declare egreso: number;
    declare sobrante: number;
}

const initGestionPagoProveedoresModel = (sequelize: Sequelize) => {
    GestionPagoProveedores.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            ingreso: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            egreso: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            sobrante: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'GestionPagoProveedores',
            tableName: 'gestion_pago_proveedores',
            freezeTableName: true,
            paranoid: true,
            timestamps: false,
        }
    );
}
export { initGestionPagoProveedoresModel, GestionPagoProveedores };