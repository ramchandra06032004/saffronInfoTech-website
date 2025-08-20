import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Orders from "@/models/ordersModel";
import { getToken } from "next-auth/jwt";
import User from "@/models/userModel";
import Product from "@/models/productModel";
import { calculateTotalPrice } from "@/helpers/calculatePaymentUsingPlanId";
import Recipt from "@/models/paymentsRecipt";
import { instance } from "@/lib/razorpay";
import crypto from "crypto";
export async function POST(request: NextRequest) {
  await dbConnect();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = token._id;
  const {
    preferedDate,
    powerPlantId,
    type,
    paymentMode,
    cartItems,
    id,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  } = await request.json();
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!preferedDate || !powerPlantId || !type || !paymentMode) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!cartItems || !Array.isArray(cartItems)) {
    return NextResponse.json({ error: "Invalid product IDs" }, { status: 400 });
  }
  const product = await Product.find({ _id: { $in: cartItems } });
  const { total } = calculateTotalPrice(product[0].price);

  try {
    const generated_signature = crypto
      .createHmac("sha256", process.env.YOUR_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      const recipt = await Recipt.findById(id);
      if (recipt) {
        recipt.status = "Failed";
        await recipt.save();
      }
      return NextResponse.json({ error: "Signature verification failed" }, { status: 400 });
    }
    const recipt = await Recipt.findById(id);
    if (!recipt) {
      return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
    }
    recipt.status="Completed"
    await recipt.save();
    const newOrder = new Orders({
      user: userId,
      preferedDate,
      powerPlant: powerPlantId,
      type,
      paymentMode,
      amount: total,
      product: product[0]._id,
      paymentRecipt: id,
      razorpay_payment_id,
      razorpay_order_id,
    });


    await newOrder.save();

    user.orders.push(newOrder._id);
    await user.save();

    return NextResponse.json(
      { message: "Order created successfully", status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
