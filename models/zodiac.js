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
      Zodiac.hasMany(models.Review, {
        foreignKey: 'zodiacId',
        as: 'zodiac_reviews',
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })

      Zodiac.hasMany(models.User, {
        foreignKey: 'zodiacId',
        as: 'signs_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Zodiac.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      description: DataTypes.TEXT
    },
    {
      sequelize,
      modelName: 'Zodiac',
      tableName: 'signs'
    }
  )
  return Zodiac
}
