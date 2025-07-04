import { NextRequest } from "next/server";
import Video from "@/models/Video";
import DBConnect from "@/lib/db"; // your MongoDB connection utility
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  await DBConnect();

  try {
    const videos = await Video.aggregate([
      { $match: { uploadedBy: new mongoose.Types.ObjectId(params.userId) } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          videoUrl: 1,
          thumbnailUrl: 1,
          createdAt: 1,
          transformation: 1,
        },
      },
    ]);

    return Response.json({ videos }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch user videos", details: error },
      { status: 500 }
    );
  }
}
