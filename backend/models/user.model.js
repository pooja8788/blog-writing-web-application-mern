import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  photo: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  education: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["superadmin","user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  isCreator: {
    type: Boolean,
    default: false,
  },
  creatorAgreementAccepted: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const User = mongoose.model("User", userSchema);
