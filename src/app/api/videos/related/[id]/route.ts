// app/api/videos/related/[id]/route.ts
import DBConnect from "@/lib/db";
import Video from "@/models/Video";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await DBConnect();

    // const currentVideo = await Video.findById(id).lean();
    // if (!currentVideo) {
    //   return Response.json({ error: "Video not found" }, { status: 404 });
    // }

    const relatedVideos = await Video.find({
      _id: { $ne: id }, 
    //   category: currentVideo.category,
    })
      .limit(5)
      .populate("uploadedBy", "-password")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ relatedVideos }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch related videos", error);
    return Response.json({ error: "Failed to fetch related videos" }, { status: 500 });
  }
}
