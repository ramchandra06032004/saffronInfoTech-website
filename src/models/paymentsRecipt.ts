import mongoose from "mongoose";
const paymentRecipt = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
    required: true,
  },
  powerPlantId: {
    type: mongoose.Schema.ObjectId,
    ref: "SolarPowerPlant",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  paymentMode: {
    type: String,
    required: true,
    enum: ["Online", "Cash"],
  },
  date: { type: Date, default: Date.now },
});

const Recipt = mongoose.models.PaymentRecipt || mongoose.model("PaymentRecipt", paymentRecipt);

export default Recipt;
