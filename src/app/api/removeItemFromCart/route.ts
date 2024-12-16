import User from "@/models/userModel";
import { dbConnect } from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Schema } from "mongoose";

export async function DELETE(request: NextRequest) {
  await dbConnect();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = token._id;
  const { productId } = await request.json();

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.cartItem = user.cartItem.filter((id:Schema.Types.ObjectId) => id.toString() !== productId);

    await user.save();

    return NextResponse.json({ message: "Product removed from cart successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}