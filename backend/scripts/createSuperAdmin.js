import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const createSuperAdmin = async () => {
  const existing = await User.findOne({ role: "superadmin" });
  if (existing) {
    console.log("⚠️ SuperAdmin already exists.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 12);

  const superAdmin = await User.create({
    name: process.env.SUPERADMIN_NAME,
    email: process.env.SUPERADMIN_EMAIL,
    phone: process.env.SUPERADMIN_PHONE,
    password: hashedPassword,
    role: "superadmin",
    education: "Admin of system", // Required field
    photo: {
      public_id: "default_superadmin_id",
      url: "https://res.cloudinary.com/demo/image/upload/v1690000000/default-user.jpg", // Or any default image URL
    },
  });

  console.log("✅ SuperAdmin created:", superAdmin.email);
  process.exit(0);
};

createSuperAdmin();
