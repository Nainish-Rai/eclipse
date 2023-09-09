import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = String(searchParams.get("url"));
  try {
    axios.head(url)
    let response = await axios.get(url, { responseType: "arraybuffer" })
    if (response.status === 200) {
      const imgBuff = Buffer.from(response.data, "binary");
      const headers = new Headers();
      headers.set('Content-Type', response.headers['content-type'])
      headers.set('Content-Length', imgBuff.length.toString())
      return new Response(
        imgBuff,
        {
          status: 200,
          statusText: "OK",
          headers
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
