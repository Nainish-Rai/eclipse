import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = String(searchParams.get("url"));
  console.log(url)
  try {
    let response = await axios.get(url, { responseType: "blob" })
    if (response.status === 200) {
      return new Response(
        response.data,
        {
          status: 200,
          statusText: "OK",
          headers: {
            "content-type": "image/jpeg",
          }
        }
      )
    } else {
      return new NextResponse('Not Found', { status: 404, statusText: "NOT FOUND" });
    }
  } catch (err) {
    console.log({ err })
    return new NextResponse(String(err), { status: 404, statusText: "NOT FOUND" })
  }
}
