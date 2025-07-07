"use client";

import VideoComponent from "./VideoComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useVideos } from "@/hooks/useVideos";
import { useEffect } from "react";
import { setVideos } from "@/store/slices/videoSlice";


export default function VideoFeed() {
  const videos = useSelector((state: RootState) => state.videos?.videos);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useVideos();

  useEffect(() => {
    if (data) {
      dispatch(setVideos(data));
    }
  }, [data]);

  if (isLoading) return <p>Loading videos...</p>;
  if (isError) return <p className="text-red-600">Error: {isError}</p>;

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