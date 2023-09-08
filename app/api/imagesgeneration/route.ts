import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();

    // const response = await axios.post(
    //   `${process.env.API_BASE!}/images/generations`,
    //   reqBody,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.API_KEY!}`,
    //     },
    //   }
    // );
    const rawResponse = await fetch(
      `${process.env.API_BASE!}/images/generations`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY!}`,
        },
        body: JSON.stringify(reqBody),
      }
    );
    const content = await rawResponse.json();

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.error();
  }
};
