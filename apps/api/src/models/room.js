import { Model, DataTypes } from 'sequelize';

export default class Room extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Room.hasMany(models.Transaction);
    Room.belongsTo(models.Property, {
      foreignKey: 'PropertyId', 
      onDelete: 'CASCADE',
    });
    Room.hasOne(models.Room_disable);
    Room.hasOne(models.Price_increase);
  }
}

export const init = (sequelize) => {
  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Room',
    },
  );
};
