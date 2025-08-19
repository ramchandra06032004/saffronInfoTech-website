import { dbConnect } from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import User from "@/models/userModel";
import PowerPlant from "@/models/powerPlantModel";

export async function POST(request: NextRequest) {
  await dbConnect();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = token._id;
  const { govId, nameOfOwner, mobileNumber, address, capacity } = await request.json();

  if (!govId || !nameOfOwner || !mobileNumber || !address || !capacity) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const numericCapacity = Number(capacity);

  if (isNaN(numericCapacity) || !Number.isInteger(numericCapacity)) {
    return NextResponse.json({ error: "Capacity must be a valid integer in KW" }, { status: 400 });
  }

  try {
    // Create a new power plant document
    const newPowerPlant = new PowerPlant({
      govId,
      nameOfOwner,
      mobileNumber,
      address,
      capacity: numericCapacity,
    });
    
    await newPowerPlant.save();

    // Update the user's solarPowerPlants array
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.solarPowerPlants.push(newPowerPlant._id);
    await user.save();

    return NextResponse.json({ message: "Power plant added successfully", powerPlant: newPowerPlant }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}