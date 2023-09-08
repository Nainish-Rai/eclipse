import { NextRequest, NextResponse } from "next/server";
import {v2 as cloud} from "cloudinary";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
    const body = await request.json()
    let { url, prompt } = body;

    if (!url) {
        return new NextResponse("Missing Fields", { status: 400 })
    }

    cloud.config({
        cloud_name: process.env.CLOUDINDARY_NAME,
        api_key: process.env.CLOUDINDARY_API_KEY,
        api_secret: process.env.CLOUDINDARY_API_SECRET
    })

    let res = await cloud.uploader.upload(url);
    let image = prisma.image.create({
        data: {
            url: res.url,
            public_id: res.public_id,
        }
    })
    let imageDetails = {
        url: res.secure_url,
        public_id: res.public_id,
        placeholder: res.placeholder,
        desc: prompt
    }

    return NextResponse.json(imageDetails)
}
