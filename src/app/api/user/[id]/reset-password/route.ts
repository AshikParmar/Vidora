import { authOptions } from "@/lib/auth";
import DBConnect from "@/lib/db";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;
  const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
        return Response.json({ error: "Current and new passwords are required" }, { status: 402 });
    }
    
    await DBConnect();
    try {
        const user = await User.findById(userId);
        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }
        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return Response.json({ error: "Current password is incorrect" }, { status: 403 });
        }

        user.password = newPassword;
        await user.save();

        return Response.json({ message: "Password reset successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
    
}