import { Model, DataTypes } from 'sequelize';

export default class Price_increase extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Price_increase.belongsTo(models.Room)
  }
}

export const init = (sequelize) => {
  Price_increase.init({
    increase: {type: DataTypes.DECIMAL, allowNull: false},
    date:{type: DataTypes.DATE,allowNull: false}
  }, {
    sequelize,
    modelName: 'Price_increase',
  });
};