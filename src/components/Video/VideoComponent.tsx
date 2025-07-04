import Link from "next/link";
import { IVideo } from "@/models/Video";
import Image from "next/image";
import { Avatar } from "antd";
import { IKVideo } from "imagekitio-next";
import { UserState } from "@/types/types";

export default function VideoComponent({ video }: { video: IVideo }) {
  const uploader = video.uploadedBy as UserState;

  return (
    <div className="card bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300">
      {/* Video Preview */}
      <figure className="relative px-4 pt-4">
         <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "16/9" }}
          >
            <IKVideo
              urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
              path={video.videoUrl.replace("https://ik.imagekit.io/Ashik0512/", "")}
              // transformation={[
              //   {
              //     height: "1080",
              //     width: "1920",
              //   },
              // ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>

      <div className="card-body px-4 pb-4 pt-3 flex gap-3">

        <Link href={`/profile/${uploader?._id}`}>
          {uploader?.avatar ?
            (<Image
              src={uploader?.avatar} 
              alt={uploader?.username || "User"}
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10"
            />)
            :
            (<Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
              {uploader?.username?.charAt(0).toUpperCase()}
            </Avatar>
            )}

        </Link>

     
        <div className="flex-1">
          <Link href={`/videos/${video._id}`}>
            <h2 className="text-base font-semibold text-gray-900 hover:opacity-80">
              {video.title}
            </h2>
          </Link>

          <Link href={`/profile/${uploader?._id}`}>
            <p className="text-sm text-gray-600 hover:underline">
              @{uploader?.username}
            </p>
          </Link>

          {/* <p className="text-sm text-gray-500 line-clamp-2">
            {video.description}
          </p> */}
        </div>
      </div>
    </div>
  );
}
