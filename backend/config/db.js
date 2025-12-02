// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.error("⚠️ Possible reasons:");
    console.error("   - IP not whitelisted in MongoDB Atlas");
    console.error("   - Wrong username/password in MONGO_URL");
    console.error("   - Database name does not exist");
    console.error("   - Network/firewall blocking connection");
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;
