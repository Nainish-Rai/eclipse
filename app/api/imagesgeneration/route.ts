import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    const response = await axios.post(
      `${process.env.API_BASE!}/images/generations`,
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY!}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.error();
  }
};
