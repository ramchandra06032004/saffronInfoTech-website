import Product from "@/models/productModel";
import { dbConnect } from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  await dbConnect();
  
  try {
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    
    return NextResponse.json({ error: "Error in fetching all products" }, { status: 500 });
  }
}
