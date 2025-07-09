import DBConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params;

    if (!id) {
        return Response.json({
            error: "ID is required"
        }, { status: 400 });
    }

    try {
        await DBConnect();
        const user = await User.findById(id).select("-password").lean();

        if (!user) {
            return Response.json({
                error: "No user Found with this ID"
            }, { status: 404 })
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


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await DBConnect();
    const body = await request.json();

    const allowedUpdates = ["username", "avatar"];
    const updates: Record<string, any> = {};

    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password").lean();

    if (!updatedUser) {
      return Response.json({ error: "No user found with this ID" }, { status: 404 });
    }

    return Response.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Failed to update user", error);
    return Response.json({ error: "Failed to update user" }, { status: 500 });
  }
}