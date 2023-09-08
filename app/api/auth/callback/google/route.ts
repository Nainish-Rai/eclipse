import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest) => {
  return NextResponse.redirect(new URL("/studio", req.url));
};
