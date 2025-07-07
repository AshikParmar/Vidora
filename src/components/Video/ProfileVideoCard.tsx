import Link from "next/link";
import { IKVideo } from "imagekitio-next";
import { userVideos } from "@/types/types";

export default function ProfileVideoCard({ video }: { video: userVideos }) {
  const videoPath = video.videoUrl.replace("https://ik.imagekit.io/Ashik0512/", "");

  return (
    <div className="card bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Video */}
      <Link href={`/videos/${video._id}`}>
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <IKVideo
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            path={videoPath}
            controls={true}
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-1">
        <Link href={`/videos/${video._id}`}>
          <h3 className="text-sm font-semibold text-gray-900 hover:underline line-clamp-1">
            {video.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-600 line-clamp-2">{video.description}</p>
        <p className="text-[11px] text-gray-400">{new Date(video.createdAt as string).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
