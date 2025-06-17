import { 
    DataTypes, 
    Model, 
    CreationOptional, 
    InferCreationAttributes,
    Sequelize 
} from 'sequelize';

interface TransaccionAttributes {
    id: number;
    tipo: string;
    monto: number;
    fecha: Date;
    origen: string;
    id_origen: number;
}


class Transaccion extends Model<TransaccionAttributes, InferCreationAttributes<Transaccion>> implements TransaccionAttributes {
    declare id: CreationOptional<number>;
    declare tipo: string;
    declare monto: number;
    declare fecha: Date;
    declare origen: string;
    declare id_origen: number;
}

const initTransaccionModel = (sequelize: Sequelize) => {
    Transaccion.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            tipo: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            monto: {
                type: DataTypes.DECIMAL(10, 0),
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            origen: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            id_origen: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'transacciones',
            timestamps: false,
        }
    );
}

export  { Transaccion, initTransaccionModel };