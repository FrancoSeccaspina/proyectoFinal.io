import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

interface GrupoMuscularAttributes {
    id: CreationOptional<number>;
    nombre: string;
}
class GrupoMuscular extends Model<InferAttributes<GrupoMuscular>, InferCreationAttributes<GrupoMuscular>> implements GrupoMuscularAttributes {
    declare id: CreationOptional<number>;
    declare nombre: string;

    static associate(models: any) {
        GrupoMuscular.hasOne(models.Ejercicio, {
            foreignKey: 'grupo_muscular_id_fk',
        });
    }
}
const initGrupoMuscularModel = (sequelize: Sequelize) => {
    GrupoMuscular.init(
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
        },
        {
            sequelize,
            modelName: 'GrupoMuscular',
            tableName: 'grupos_musculares',
            freezeTableName: true,
            paranoid: true,
            timestamps: false,
        }
    )
}
export {GrupoMuscular, initGrupoMuscularModel};