import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page"))
  const pageSize = 40;

  const imageCount = await prisma.image.count();
  const hasMore = page * pageSize < imageCount;
  const images = await prisma.image.findMany({
    select: {
      id: true,
      url: true,
      desc: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })

  const response = {
    images,
    hasMore,
    count: imageCount
  }

  return NextResponse.json(response)
}
