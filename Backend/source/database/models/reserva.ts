import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { DetalleReserva } from './detalleReserva';

interface ReservaAttributes {
  id_reserva: number;
  id_usuario: number;
  fecha: Date;
  total: number;
  estado: string;
  vencimiento: Date;
}

class Reserva extends Model<InferAttributes<Reserva>, InferCreationAttributes<Reserva>> implements ReservaAttributes {
  declare id_reserva: CreationOptional<number>;
  declare id_usuario: number;
  declare fecha: Date;
  declare total: number;
  declare estado: string;
  declare vencimiento: Date;

  declare DetalleReservas?: DetalleReserva[];

  static associate(models: any) {
    Reserva.belongsTo(models.Usuario, {
      foreignKey: 'id_usuario',
    });

    Reserva.hasMany(models.DetalleReserva, {
      foreignKey: 'id_reserva',
    });
  }
}

const initReservaModel = (sequelize: Sequelize) => {
  Reserva.init(
    {
      id_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      vencimiento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Reserva',
      tableName: 'reservas',
      freezeTableName: true,
      paranoid: true,
      timestamps: false,
    }
  );
};

export { Reserva, initReservaModel };