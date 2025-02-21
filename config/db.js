const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db)
    console.log("MongoDb connected");
  } catch (e) {
    console.error(e.message);

    //exit the process with exit code 1 i.e failure
    process.exit(1);
  }
};

module.exports = connectDB;
