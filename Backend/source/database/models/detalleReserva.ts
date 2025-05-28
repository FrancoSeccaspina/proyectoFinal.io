import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

interface DetalleReservaAttributes {
  id_detalle_reserva: number;
  id_producto: number;
  cantidad: number;
  id_reserva: number;
  subtotal:number
}

class DetalleReserva extends Model<
  InferAttributes<DetalleReserva>,
  InferCreationAttributes<DetalleReserva>
> 
implements DetalleReservaAttributes {
  declare id_detalle_reserva: CreationOptional<number>;
  declare id_producto: number;
  declare cantidad: number;
  declare id_reserva: number;
  declare subtotal: number;

  static associate(models: any) {
    DetalleReserva.belongsTo(models.Reserva, {
      foreignKey: 'id_reserva',
    });

    DetalleReserva.belongsTo(models.Producto, {
      foreignKey: 'id_producto',
    });
  }
}

const initDetalleReservaModel = (sequelize: Sequelize) => {
  DetalleReserva.init(
    {
      id_detalle_reserva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'productos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_reserva: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'reservas',
          key: 'id_reserva',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
                  subtotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
    },
    {
      sequelize,
      modelName: 'DetalleReserva',
      tableName: 'detalle_reservas',
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export { DetalleReserva, initDetalleReservaModel };
