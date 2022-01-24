// 1- require mongoose

// require mongoose
const mongoose = require("mongoose");
// create connect DB function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected");
  } catch (error) {
    console.log("can not connect to DB");
  }
};

module.exports = connectDB;