import Link from "next/link";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { Avatar } from "antd";
import { IKVideo } from "imagekitio-next";
import { UserState } from "@/types/types";

export default function SingleVideoCard({ video }: { video: IVideo }) {
  const uploader = video.uploadedBy as UserState;

  // Format date to show relative time (you can add a utility function for this)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <div className="group max-w-4xl">
      {/* Video Thumbnail Container */}
      <div className="relative mb-2">
        <div
          className="rounded-xl overflow-hidden relative w-full bg-gray-100"
          style={{ aspectRatio: "16/9" }}
        >
          <IKVideo
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            path={video.videoUrl.replace("https://ik.imagekit.io/", "")}
            controls={true}
            className="w-full h-full object-cover"
            poster={video.thumbnailUrl || undefined}
          />

          {/* Video Duration Badge (if you have duration data) */}
          {/* <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {video.duration || "0:00"}
          </div> */}
        </div>
      </div>

      {/* Video Info */}
      <div className="flex flex-col gap-2 border-b border-b-gray-600 p-2">
        <div className="flex">
          {/* Title */}
          <h2 className="flex-1 text-lg font-semibold text-gray-900 line-clamp-2 leading-5 mb-1 hover:text-blue-600 transition-colors">
            {video.title}
          </h2>
          {/* Three Dots Menu (optional) */}
          <div className="flex-shrink-0">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex gap-3 mb-2">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Link href={`/profile/${uploader?._id}`}>
              {uploader?.avatar ? (
                <Image
                  src={uploader.avatar}
                  alt={uploader.username || "User"}
                  width={36}
                  height={36}
                  className="rounded-full object-cover w-9 h-9 hover:opacity-80 transition-opacity"
                />
              ) : (
                <Avatar
                  size={36}
                  style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {uploader?.username?.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </Link>
          </div>

          {/* Video Details */}
            {/* Channel Name */}
            <Link href={`/profile/${uploader?._id}`}>
              <p className="text-sm text-gray-600 hover:text-gray-900 transition-colors mb-1">
                @{uploader?.username}
              </p>
            </Link>

        </div>

      </div>
      <div className="text-xs text-gray-500 mt-2 px-2">
        {/* Video Stats and Date */}
        <div className="flex items-center text-xs text-gray-500 space-x-1">
          {/* <span>{video.views || "0"} views</span>
            <span>•</span> */}
          <span>{formatDate(video.createdAt as string)}</span>
        </div>

        {/* Description (optional, can be hidden on small cards) */}
        {video.description && (
          <div className="mt-2">
            <p className="text-s text-black">Description</p>
            <p className="text-xs text-gray-500 line-clamp-2 mt-2 hidden sm:block">
              {video.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}