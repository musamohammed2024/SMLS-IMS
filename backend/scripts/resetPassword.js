require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const newPassword = "Admin123";

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await User.updateOne(
      { email: "admin@example.com" },
      { $set: { password: hashedPassword } }
    );

    console.log("Update Result:", result);
    console.log("✅ Password reset successfully.");
    console.log("Email: admin@example.com");
    console.log("Password: Admin123");

    await mongoose.disconnect();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

resetPassword(); 