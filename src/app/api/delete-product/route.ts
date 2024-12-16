import Product from "@/models/productModel";
import { dbConnect } from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function DELETE(request: NextRequest) {
  await dbConnect();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await request.json();

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}