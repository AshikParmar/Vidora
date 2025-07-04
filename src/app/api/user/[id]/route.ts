import DBConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
        const { id } = params;

        if (!id) {
            throw new Error("ID is required");
        }

        try {
            await DBConnect();
            const user = await User.findById(id).select("-password").lean();

            if (!user) {
                throw new Error("No user Found with this ID")
            }

            return Response.json({
                user
            }, { status: 200 })

        } catch (error) {
            console.error("Failed to Fetch user ", error)
            return Response.json({
                error: "Failed to fetch user"
            }, { status: 500 })
        }
    }
