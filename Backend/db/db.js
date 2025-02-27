const mongoose = require("mongoose");
const DB_NAME = require('./constants');

const connectDB = async () => {
  try {
      const connnectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
      console.log(`\nMongoDB connected !! DB HOST: ${connnectionInstance.connection.host}`);
  } catch (error) {
      console.log("MONGODB connection error ", error)
      process.exit(1)
  }
}

module.exports = connectDB;
