import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import superAdminRoutes from "./routes/superadmin.routes.js"

import cors from "cors";

const app = express();
dotenv.config();

const port = process.env.PORT;
const MONOGO_URL = process.env.MONOGO_URL;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// DB Code
const connectToDB = async () => {
  try {
    await mongoose.connect(MONOGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
  }
};

connectToDB();

// try {
//   mongoose.connect(MONOGO_URL);
//   console.log("Conntected to MonogDB");
// } catch (error) {
//   console.log(error);
// }

// defining routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/superadmin", superAdminRoutes);
app.use('/api/categories', categoryRoutes);

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


import rateLimit from "express-rate-limit";

// Apply rate limit only to OTP route
const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // max 3 requests per window
  message: "Too many OTP requests from this IP. Try again after 5 minutes.",
});

app.use("/api/users/send-otp", otpLimiter);