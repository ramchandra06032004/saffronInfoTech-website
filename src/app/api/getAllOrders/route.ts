//route to fetch all orders it will take arry of id as input and return all orders

import Orders from "@/models/ordersModel";
import { dbConnect } from "@/dbConfig/dbConnect";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {

        const token=await getToken({
            req:request,
            secret:process.env.NEXTAUTH_SECRET
        })

        if(!token){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }
        
        const {orderIds}=await request.json();
        console.log(orderIds);
        
        const orders = await Orders.find({ _id: { $in: orderIds } });
        return NextResponse.json(orders, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}