import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

interface RecetaAttributes {
    id: CreationOptional<number>;
    nombre: string;
    descripcion: string;
    categoria_id_fk: number;
}

class Receta extends Model<InferAttributes<Receta>, InferCreationAttributes<Receta>> implements RecetaAttributes {
    declare id: CreationOptional<number>;
    declare nombre: string;
    declare descripcion: string;
    declare categoria_id_fk: number;

    static associate(models: any) {
        Receta.belongsTo(models.CategoriaReceta, {
            foreignKey: 'categoria_id_fk',
        });
    }
}

const initRecetaModel = (sequelize: Sequelize) => {
    Receta.init(
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
            categoria_id_fk: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Receta',
            tableName: 'recetas',
            freezeTableName: true,
            paranoid: true,
            timestamps: false,
        }
    );
}
export { Receta, initRecetaModel };