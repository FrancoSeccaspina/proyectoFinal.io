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
    usuario_id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado: string;

}

class Membresia extends Model<InferAttributes<Membresia>, InferCreationAttributes<Membresia>> implements MembresiaAttributes {
    declare id: CreationOptional<number>;
    declare usuario_id: number;
    declare fecha_inicio: Date;
    declare fecha_fin: Date;
    declare estado: string;
    static associate(models: any) {
        Membresia.belongsTo(models.Usuario, {
          foreignKey: 'usuario_id',
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
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'usuarios',
                  key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
              },
            fecha_inicio: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            fecha_fin: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            estado: {
                type: DataTypes.STRING(255),
                allowNull: false,
              },
        },
        {
            sequelize,
            modelName: 'Membresia',
            tableName: 'membresia',
            timestamps: false,
        }
    );
}
export { Membresia, initMembresiaModel };