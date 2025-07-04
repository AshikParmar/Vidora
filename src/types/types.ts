import { IUser } from "@/models/User";
import { IVideo } from "@/models/Video";


export type UserState = Omit<IUser, "password">;

export type userVideos = Omit<IVideo, "uploadedBy">