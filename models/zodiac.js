'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Zodiac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Zodiac.belongsTo(models.User, {
        foreignKey: 'userId'
        // as: 'zodiac_reviews',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE'
      })
    }
  }
  Zodiac.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      description: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Zodiac',
      tableName: 'signs'
    }
  )
  return Zodiac
}
