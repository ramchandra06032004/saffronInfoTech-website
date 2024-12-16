import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  await dbConnect();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ message: "Request from Unauthorized user" }, { status: 401 });
  }

  

  const { name, description, price, countInStock, imageUrl, duration } = await request.json();

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      countInStock,
      imageUrl,
      duration,
    });

    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}