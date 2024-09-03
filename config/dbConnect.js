const { default: mongoose } = require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Succesfully");   
    } catch (error) {
        console.log("Database Error");     
    }
};

module.exports = dbConnect;