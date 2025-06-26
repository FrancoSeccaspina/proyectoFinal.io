import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize';

interface EmpleadoAttributes {
    id: number;
    nombre: string;
    apellido: string;
    celular: number;
    actividad: string;

}

class Empleado extends Model<InferAttributes<Empleado>, InferCreationAttributes<Empleado>> implements EmpleadoAttributes {
    declare id: CreationOptional<number>;
    declare nombre: string;
    declare apellido: string;
    declare celular: number;
    declare actividad: string;

    static associate(models: any) {
    }

}

const initEmpleadoModel = (sequelize: Sequelize) => {
    Empleado.init(
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
            actividad: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Empleado',
            tableName: 'empleados',
            freezeTableName: true,
            paranoid: true,
            timestamps: false,
        })
}
export { initEmpleadoModel, Empleado };