import { NextResponse } from "next/server";
import { dbConnect } from "@/dbConfig/dbConnect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  await dbConnect();

  try {
    const { _id, code, password } = await request.json();

    if (!_id || !code || !password) {
      return NextResponse.json(
        { success: false, message: "Missing parameters" },
        { status: 400 }
      );
    }

    const decodedID = decodeURIComponent(_id);
    const user = await User.findOne({ _id: decodedID });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isCodeValid = user.resetPasswordCode === code;
    const isCodeNotExpired =
      new Date(user.expiryTimeResetPassword) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      user.resetPasswordCode = "";

      await user.save();

      return NextResponse.json(
        {
          success: true,
          message: "Password reset successfully",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Verification code has expired. Please sign up again to get a new code.",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Incorrect verification code" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
