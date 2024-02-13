import { Model, DataTypes } from 'sequelize';

export default class Location extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.hasOne(models.Property);
  }
}

export const init = (sequelize) => {
  Location.init(
    {
      city: { type: DataTypes.STRING, allowNull: false },
      province: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Location',
    },
  );
};
