import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DBConnect from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing Email or Password")
                }

                try {
                    await DBConnect();
                    const user = await User.findOne({ email: credentials.email })

                    if (!user) {
                        throw new Error("No user Found with this Email")
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password)

                    if (!isValid) {
                        throw new Error("Invalid Password")
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    }

                } catch (error) {
                    console.error("Auth Error ", error);
                    throw error
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        }

    },
    pages:{
        signIn: "/login",
        error: "/api/auth/signin",
    },
    // theme: {
    //     colorScheme: "light",
    //     brandColor: "#2563eb",     // Button background color
    //     buttonText: "#ffffff",     // Button text color
    //     logo: "https://tse3.mm.bing.net/th?id=OIP.NWnITLblx9ipLhmWID3ovQHaE8&pid=Api&P=0&h=180https://example.com/logo.png",
    // },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET

}