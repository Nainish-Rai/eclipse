import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json({ name: "John Doe" });
  } catch (error) {
    return NextResponse.error();
  }
};
