import DBConnect from "@/lib/db";
import Video from "@/models/Video";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
        const { id } = await params;

        if (!id) {
            throw new Error("ID is required");
        }

        try {
            await DBConnect();
            const video = await Video.findById(id).populate("uploadedBy", "-password").lean();

            if (!video) {
                return Response.json({
                    error: "No video Found with this ID"
                }, { status: 404 })
            }

            return Response.json({
                video
            }, { status: 200 })

        } catch (error) {
            console.error("Failed to Fetch video ", error)
            return Response.json({
                error: "Failed to fetch video"
            }, { status: 500 })
        }
    }
