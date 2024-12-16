import Product from "@/models/productModel";
import { dbConnect } from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  await dbConnect();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = token._id;

  try {
    const user = await User.findById(userId).select('-password -role -isVerified -verifyCode -expiryTimeOTP -resetPasswordCode -expiryTimeResetPassword');

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}