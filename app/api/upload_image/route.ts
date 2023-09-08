import { NextRequest, NextResponse } from "next/server";
import { v2 as cloud } from "cloudinary";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  const body = await request.json();
  let { url, prompt, user_id } = body;

  if (!url) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  cloud.config({
    cloud_name: process.env.CLOUDINDARY_NAME!,
    api_key: process.env.CLOUDINDARY_API_KEY!,
    api_secret: process.env.CLOUDINDARY_API_SECRET!,
  });

  let res = await cloud.uploader.upload(url);
  let user = user_id
    ? await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      })
    : null;

  let image = await prisma.image.create({
    data: {
      url: res.secure_url,
      public_id: res.public_id,
      desc: prompt,
      user_id: user?.id,
    },
  });
  let imageResponse = {
    ...image,
    user,
  };

  return NextResponse.json(imageResponse);
}
