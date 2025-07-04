import { authOptions } from "@/lib/auth";
import DBConnect from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        await DBConnect();
        const videos = await Video.find().populate("uploadedBy", "-password").sort({ createdAt: -1 }).lean()

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
        NextResponse.json({
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
            transformation: {  
                height: 1920,
                width: 1080,
                quality: body?.transformation?.quality ?? 100,
            }
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