import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

interface MembresiaAttributes {
    id: number;
    tipo: string;
    fecha_inicio: Date;
    fecha_vencimiento: Date;

}

class Membresia extends Model<InferAttributes<Membresia>, InferCreationAttributes<Membresia>> implements MembresiaAttributes {
    declare id: CreationOptional<number>;
    declare tipo: string;
    declare fecha_inicio: Date;
    declare fecha_vencimiento: Date;


    static associate(models: any) {
        Membresia.hasOne(models.Usuario, {
            foreignKey: 'id_membresia',
        });
    }
}
const initMembresiaModel = (sequelize: Sequelize) => {
    Membresia.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            tipo: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            fecha_inicio: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            fecha_vencimiento: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Membresia',
            tableName: 'membresias',
        }
    );
}
export { Membresia, initMembresiaModel };