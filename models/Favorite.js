const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); 
class Favorite extends Model {}

Favorite.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.JSONB), 
      defaultValue: [],
    },
    amount: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
    address: {
      type: DataTypes.JSONB, 
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize, 
    modelName: 'Favorite', 
    timestamps: true, 
  }
);

module.exports = Favorite;
