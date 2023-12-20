import { Model, DataTypes } from 'sequelize';

export default class Transaction extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Transaction.belongsTo(models.User);
    Transaction.belongsTo(models.Room);
  }
}

export const init = (sequelize) => {
  Transaction.init(
    {
      checkIn: { type: DataTypes.DATE, allowNull: false },
      checkOut: { type: DataTypes.DATE, allowNull: false },
      total_price: { type: DataTypes.INTEGER, allowNull: false },
      total_night: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.ENUM(
          'menunggu pembayaran',
          'pembayaran berhasil',
          'transaksi dibatalkan',
        ), allowNull: false
      },
      payment_method: { type: DataTypes.ENUM("transfer manual", "otomatis"), allowNull: false},
      bukti_pembayaran: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: 'Transaction',
    },
  );
};
