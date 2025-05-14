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
<<<<<<< HEAD

=======
>>>>>>> 91e82696598ce8eaa40fa19497247a043c3a1287
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
            categoriaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'categoria_id' // Mapeo al nombre real de la columna en la base de datos
            },
<<<<<<< HEAD
            imagen:{
                type:DataTypes.STRING(500),
                allowNull: false
            }
=======
            imagen: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
>>>>>>> 91e82696598ce8eaa40fa19497247a043c3a1287
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