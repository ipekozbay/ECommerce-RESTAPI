const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); 

class Order extends Model {}

Order.init(
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
    modelName: 'Order', 
    timestamps: true, 
  }
);

module.exports = Order;
