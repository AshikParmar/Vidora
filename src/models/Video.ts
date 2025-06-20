import mongoose, { model, models, Schema } from "mongoose";
import { IUser } from "./User";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    uploadedBy: mongoose.Types.ObjectId | IUser;
    title: String;
    description: String;
    videoUrl: String;
    thumbnailUrl: String;
    controls?: boolean;
    transformation?: {
        height: number;
        width: number;
        quality?: number;
    }
}

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    controls: {
        type: Boolean,
        default: true,
    },
    transformation: {
        height: { type: Number, default: VIDEO_DIMENSIONS.height },
        width: { type: Number, default: VIDEO_DIMENSIONS.width },
        quality: { type: Number, min: 1, max: 100 }
    }
}, {
    timestamps: true,
})


const Video = models.Video || model<IVideo>("Video", videoSchema);

export default Video;