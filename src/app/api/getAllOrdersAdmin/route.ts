import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Orders from "@/models/ordersModel";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  await dbConnect();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || token.role !== "admin") {
    return NextResponse.json({ 
        error: "Access Denied" 
    }, { status: 401 });
  }

  try {
    const orders = await Orders.find();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
