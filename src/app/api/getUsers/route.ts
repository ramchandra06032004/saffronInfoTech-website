import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  await dbConnect();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
    if (!token || token.role !== 'admin') {
      return NextResponse.json({ 
        error: "Access Denied" 

      }, { status: 401 });
    }

  try {
   
    const { userId } = await request.json();
    const user_found=await User.findById(userId);
    if (!userId || !Array.isArray(userId)) {
      return NextResponse.json({ error: "Invalid user IDs" }, { status: 400 });
    }
    const user={
      userName:user_found.userName,
      email:user_found.email,
    }
    

    return NextResponse.json( user , { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}