import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize';

interface CategoriaAttributes {
    id: number;
    nombre: string;
}

class Categoria extends Model<InferAttributes<Categoria>, InferCreationAttributes<Categoria>> implements CategoriaAttributes {
    declare id: CreationOptional<number>;
    declare nombre: string;

    static associate(models: any) {
    }
}

const initCategoriaModel = (sequelize: Sequelize) => {
    Categoria.init(
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
            modelName: 'Categoria',
            tableName: 'categorias',
            freezeTableName: true,
            paranoid: true,
            timestamps: false,
        }
    );
}

export { Categoria, initCategoriaModel };