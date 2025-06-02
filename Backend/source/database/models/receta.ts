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
    categoriaId: number;
    imagen: string;
}

class Receta extends Model<InferAttributes<Receta>, InferCreationAttributes<Receta>> implements RecetaAttributes {
    declare id: CreationOptional<number>;
    declare nombre: string;
    declare descripcion: string;
    declare categoriaId: number; // Relación con la categoría
    declare imagen: string;
    static associate(models: any) {
        Receta.belongsTo(models.CategoriaReceta, {
            foreignKey: 'categoria_id',
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
            categoriaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'categoria_id' // Mapeo al nombre real de la columna en la base de datos
            },
            imagen: {
                type: DataTypes.STRING(255),
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