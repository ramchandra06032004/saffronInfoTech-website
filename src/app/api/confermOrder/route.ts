import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import Orders from "@/models/ordersModel";
import { getToken } from "next-auth/jwt";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  await dbConnect();
  
  
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId  = token._id; 
    const { preferedDate, powerPlantId, type, paymentMode, amount } = await request.json();
    const user=await User.findById(userId);
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    if (!preferedDate || !powerPlantId || !type || !paymentMode) {
        console.log("Missing required fields");
        
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    try {
        const newOrder = new Orders({
            user: userId,
            preferedDate,
            powerPlant: powerPlantId,
            type,
            paymentMode,
            amount
        });
        
        await newOrder.save();
        console.log(newOrder);
        
        user.orders.push(newOrder._id);
        await user.save();

    return NextResponse.json({ message: "Order created successfully", order: newOrder }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}