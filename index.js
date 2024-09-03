const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");;
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const favoriteRoute = require("./routes/favorite");
const logRoute = require("./routes/log");
const sequelize = require('./database'); 
const cors = require('cors');
const stripeRoute = require("./routes/stripe")
const logger = require("./log/log")

dotenv.config();

const PORT =  process.env.PORT; 

// PostgreSql connection
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Veritabanı senkronizasyonu başarılı');
  })
  .catch((err) => {
    console.error('Veritabanı senkronizasyonu başarısız:', err);
  });


  app.use(express.json());

// const corsOptions = {
//   origin: 'http://localhost:3000', 
//   credentials: true,
//   optionSuccessStatus: 200
// };

//app.use(cors(corsOptions));   



// logging middleware
app.use((req, res, next) => {
  const { method, url, headers } = req;
  const message = `${method} ${url} - ${headers['user-agent']}`;
  logger.info(message);  // Tüm istekleri logla
  next();
});



// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/logs", logRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('error!');
});

app.listen(PORT, () => {
  console.log(`Backend  ${PORT} portunda çalışmaktadır`);
});
