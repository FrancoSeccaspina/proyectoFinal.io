import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

interface EjercicioAttributes {
    id: CreationOptional<number>;
    nombre: string;
    descripcion: string;
    grupo_muscular_id_fk: number;
    video: string;
    titulo: string;
}

class Ejercicio extends Model<InferAttributes<Ejercicio>, InferCreationAttributes<Ejercicio>> implements EjercicioAttributes {
    declare id: CreationOptional<number>;
    declare nombre: string;
    declare descripcion: string;
    declare grupo_muscular_id_fk: number;
    declare video: string;
    declare titulo: string;

    static associate(models: any) {
        Ejercicio.belongsTo(models.GrupoMuscular, {
            foreignKey: 'grupo_muscular_id_fk',
        });
    }
}
const initEjercicioModel = (sequelize: Sequelize) => {
    Ejercicio.init(
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
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            grupo_muscular_id_fk: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            video: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            titulo: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Ejercicio',
            tableName: 'ejercicios',
            freezeTableName: true,
            paranoid: true,
            timestamps: false,
        }
    );
}
export { Ejercicio, initEjercicioModel };