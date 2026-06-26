const mongoose = require("mongoose");

const connectDB = async ()=>{

  try {

    const connection = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`MongoDB Connected: ${connection.connection.host}`);

  } catch (error) {
    console.log("MongoDB connection Fail: ", error.message)
    process.exit(1);
  }
}

module.exports = connectDB;
