import {
  DataTypes,
  Model,
  CreationOptional,
  InferCreationAttributes,
  Sequelize
} from 'sequelize';

interface ActividadAttributes {
  id: number;
  titulo: string;
  fecha: Date;
  horario: string;
  cupo: number;
  profesor: string;
}

class Actividad
  extends Model<ActividadAttributes, InferCreationAttributes<Actividad>>
  implements ActividadAttributes {
  declare id: CreationOptional<number>;
  declare titulo: string;
  declare fecha: Date;
  declare horario: string;
  declare cupo: number;
  declare profesor: string;
}

const initActividadModel = (sequelize: Sequelize) => {
  Actividad.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      horario: {
        type: DataTypes.STRING(5), // formato HH:mm
        allowNull: false,
      },
      cupo: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      profesor: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'actividades',
      timestamps: false,
    }
  );
};

export { Actividad, initActividadModel };