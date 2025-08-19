import { dbConnect } from "@/dbConfig/dbConnect";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import Product from "@/models/productModel";
import User from "@/models/userModel";
import { calculateTotalPrice } from "@/helpers/calculatePaymentUsingPlanId";
import Recipt from "@/models/paymentsRecipt";
import { instance } from "@/lib/razorpay";
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
  const { preferedDate, powerPlantId, type, paymentMode, cartItems } =
    await request.json();
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
  if (cartItems.length === 0 || cartItems.length > 1) {
    return NextResponse.json(
      {
        error: "You add more then 1 teams in cart",
      },
      {
        status: 400,
      }
    );
  }

  if (!cartItems || !Array.isArray(cartItems)) {
    return NextResponse.json({ error: "Invalid product IDs" }, { status: 400 });
  }
  const product = await Product.find({ _id: { $in: cartItems } });
  const { total } = calculateTotalPrice(product[0].price);

  try {
    const recipt = new Recipt({
      userId,
      powerPlantId: powerPlantId,
      product: product[0]._id,
      amount: total,
      paymentMode: paymentMode,
    });

    const savedRecipt = await recipt.save();
    const orderResponse = await instance.orders.create({
      amount: total*100,
      currency: "INR",
      receipt: savedRecipt._id,
    });

    return NextResponse.json({ orderId: orderResponse.id,amount:total,id: savedRecipt._id});
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
