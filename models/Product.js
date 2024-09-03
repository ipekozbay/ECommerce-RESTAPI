const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database'); 

class Product extends Model {}

Product.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    size: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    color: {
      type: DataTypes.ARRAY(DataTypes.STRING), 
    },
    price: {
      type: DataTypes.FLOAT, 
      allowNull: false,
    },
    inStock: {
      type: DataTypes.BOOLEAN, 
      defaultValue: true,
    },
  },
  {
    sequelize, 
    modelName: 'Product', 
    timestamps: true, 
  }
);

module.exports = Product;
