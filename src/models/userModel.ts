import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    min: [3, "Username should be at least 3 characters"],
    max: [15, "Username should be at most 15 characters"],
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: [8, "Password should be at least 8 characters"],
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  expiryTimeOTP: {
    type: Date,
    required: true,
  },
  resetPasswordCode: {
    type: String,
  },
  expiryTimeResetPassword: {
    type: Date,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Orders",
    },
  ],
  solarPowerPlants: [
    {
      type: Schema.Types.ObjectId,
      ref: "SolarPowerPlant",
    },
  ],
  cartItem: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const User = mongoose.models.userModel || mongoose.model("userModel", userSchema);

export default User;