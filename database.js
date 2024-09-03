const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");

dotenv.config();

// PostgreSQL connection
 const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER_NAME, process.env.PASSWORD, {
   host: process.env.HOST, 
   dialect: process.env.DIALECT,
   logging: false,
 });



async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL veritabanına başarılı bir şekilde bağlandı.');
  } catch (error) {
    console.error('PostgreSQL veritabanına bağlanırken bir hata oluştu:', error);
  }

}

testConnection();

module.exports = sequelize;

