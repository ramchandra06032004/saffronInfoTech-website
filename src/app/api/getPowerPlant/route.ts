import { dbConnect } from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import PowerPlant from "@/models/powerPlantModel";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  await dbConnect();
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" ,status: 401 });
  }
  const { powerPlantIds } = await request.json();

  if (!powerPlantIds || !Array.isArray(powerPlantIds)) {
    return NextResponse.json(
      { error: "Invalid power plant IDs", status: 400 }
    );
  }

  try {
    const powerPlants = await PowerPlant.find({ _id: { $in: powerPlantIds } });

    return NextResponse.json({ powerPlants, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "error while fetching power plants", status: 500 });
  }
}
