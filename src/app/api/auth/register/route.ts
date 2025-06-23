import DBConnect from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json();

        if (!username || !email || !password) {
            return NextResponse.json({
                error: "All fields are required"
            }, { status: 400 })
        }

        await DBConnect();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                error: "User already registered"
            }, { status: 400 })
        }

        const newUser = await User.create({
            username,
            email,
            password
        })

        return NextResponse.json({
            message: "User registered successfully"
        }, { status: 201 })

    } catch (error) {
        console.error("Registration Error", error)
        return NextResponse.json({
            error: "Failed to register user"
        }, { status: 500 })
    }
}