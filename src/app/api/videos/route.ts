import { authOptions } from "@/lib/auth";
import DBConnect from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") || "";
  const tag = request.nextUrl.searchParams.get("tag") || "";

  try {
    await DBConnect();
    const filter: any = {};
    // If a search term is provided, filter by title or description
     if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (tag) {
      filter.tags = { $elemMatch: { $regex: tag, $options: "i" } };
    }

    const videos = await Video.find(filter)
      .populate("uploadedBy", "-password")
      .limit(20)
      .sort({ createdAt: -1 });
      
     if (!videos || videos.length < 1) {
            return NextResponse.json({
                videos: [],
            }, { status: 200 })
        }

        return NextResponse.json({
            videos
        }, { status: 201 })

    } catch (error) {
        console.error("Failed to Fetch Videos ",error)
        return NextResponse.json({
            error: "Failed to fetch videos"
        }, { status: 500 })
    }
}


export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({
                error: "Unauthorized"
            }, { status: 401 })
        }

        await DBConnect();
        const body: IVideo = await request.json();

        if (!body.title || !body.description || !body.videoUrl ) {
            return NextResponse.json({
                error: "Missing required fields"
            }, { status: 400 })
        }

        const videoData = {
            ...body,
            // transformation: {  
            //     height: 1920,
            //     width: 1080,
            //     quality: body?.transformation?.quality ?? 100,
            // }
        }

        const newVideo = await Video.create(videoData)

        return NextResponse.json({
            newVideo
        },{status: 200})

    } catch (error) {
        console.error("Failedto post video ", error)
         NextResponse.json({
            error: "Failed to Post video"
        }, { status: 500 })
    }
}