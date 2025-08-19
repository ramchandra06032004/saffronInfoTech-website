import Product from "@/models/productModel";
import { dbConnect } from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  await dbConnect();
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productIds } = await request.json();

  if (!productIds || !Array.isArray(productIds)) {
    return NextResponse.json({ error: "Invalid product IDs" }, { status: 400 });
  }

  try {
    const products = await Product.find({ _id: { $in: productIds } });
    
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
