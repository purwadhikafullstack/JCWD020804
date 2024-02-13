import { Model, DataTypes } from 'sequelize';

export default class Room_disable extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Room_disable.belongsTo(models.Room)
  }
}

export const init = (sequelize) => {
  Room_disable.init({
    description: {
      type: DataTypes.TEXT,
    },
    date: {type: DataTypes.DATE, allowNull: false}
  }, {
    sequelize,
    modelName: 'Room_disable',
  });
};