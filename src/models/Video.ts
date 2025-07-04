import mongoose, { model, models, Schema } from "mongoose";
import { UserState } from "@/types/types";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId | string;
    uploadedBy: mongoose.Types.ObjectId | UserState | string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl?: string;
    controls?: boolean;
    transformation?: {
        height: number;
        width: number;
        quality?: number;
    }
    createdAt?: Date | string;
    updatedAt?: Date | string;
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