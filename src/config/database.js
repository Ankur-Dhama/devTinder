const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://axabhi779_db_user:3NQ7TY7QK1xhU4At@nodedev.pftho3y.mongodb.net/devTinder",
  );
};

module.exports = { connectDB };
