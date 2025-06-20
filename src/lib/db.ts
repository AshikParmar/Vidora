import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error("please define Mongodb uri in env variables");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = { conn: null, promise: null };
}

export async function DBConnect() {
    if (cached.conn) {
        console.log("db already connected")
        return cached.conn;
    }

    if (!cached.promise) {

        const options = {
            bufferCommands: true,
            maxPoolSize: 10,
        }
        cached.promise = mongoose.connect(MONGODB_URI, options)
        .then(()=> mongoose.connection)
        console.log("new connection started")
    }

    try {
        console.log("waiting for connection")
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null
        throw error;
    }

    console.log("db connected successfully")
    return cached.conn;
}