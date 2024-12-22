//route for find user by email

import { dbConnect } from "@/dbConfig/dbConnect";
import { sendVerificationEmail } from "@/helpers/sendOtpMail";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    await dbConnect();
    try {
        const {email}=await request.json();
        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json({
                success:false,
                message:"User not found"
            },{status:404})
        }

        let otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordCode=otp;
        user.expiryTimeResetPassword=new Date(Date.now() + 3600000);

        await user.save();
        const emailResponse = await sendVerificationEmail(
              email,
              user.userName,
              user.resetPasswordCode
            );

        if (!emailResponse) {
            return NextResponse.json({
                success:false,
                message:"Email not sent"
            },{status:500})
        }
        return NextResponse.json({
            id:user._id,
            success:true,
            message:"OTP sent to your email"
        },{status:200})
    } catch (error:any) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{status:500})
    }
}