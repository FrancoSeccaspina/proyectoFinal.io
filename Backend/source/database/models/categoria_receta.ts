import {
    Model,
    DataTypes,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';

interface CategoriaRecetaAttributes {
    id: CreationOptional<number>;
    nombre: string;
}

class CategoriaReceta extends Model<InferAttributes<CategoriaReceta>, InferCreationAttributes<CategoriaReceta>> implements CategoriaRecetaAttributes {
    declare id: CreationOptional<number>;
    declare nombre: string;

    static associate(models: any) {
        CategoriaReceta.hasOne(models.Receta, {
            foreignKey: 'categoria_id',
        })
    }
}
const initCategoriaRecetaModel = (sequelize: Sequelize) => {
    CategoriaReceta.init(
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
            modelName: 'CategoriaReceta',
            tableName: 'categoria_recetas',
            freezeTableName: true,
            paranoid: true,
            timestamps: false,
        }
    );
}
export { CategoriaReceta, initCategoriaRecetaModel };