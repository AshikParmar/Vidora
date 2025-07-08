"use client";

import VideoComponent from "./VideoComponent";
import { IVideo } from "@/models/Video";


export default function VideoFeed({ videos, isLoading}: { videos: IVideo[] , isLoading?: boolean}) {

  if (isLoading) return (
            <div className="h-80 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading video...</p>
                </div>
            </div>
        );

  return (
    <div className="w-full h-full p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos?.map((video) => (
        <VideoComponent key={video._id?.toString()} video={video} />
      ))}
 
      {videos?.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-base-content/70">No videos found</p>
        </div>
      )}
    </div>
  );
}