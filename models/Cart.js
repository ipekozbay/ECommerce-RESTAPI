const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); 

class Cart extends Model {}

Cart.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.JSONB), 
      defaultValue: [],
    },
  },
  {
    sequelize, 
    modelName: 'Cart',
    timestamps: true, 
  }
);

module.exports = Cart;
