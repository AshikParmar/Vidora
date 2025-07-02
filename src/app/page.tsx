"use client"

import VideoFeed from "@/components/Video/VideoFeed";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    apiClient.getVideos()
      .then((res) => {
        setVideos(res?.videos)
      }).catch((err) => {
        console.log("Error in getting videos ", err)
      })
  }, [])

  // useEffect(() => {
  //   console.log("Videos updated:", videos);
  // }, [videos]);


  return (
    <div className="bg-blue-100 w-full min-h-screen p-6">
      <VideoFeed videos={videos} />
    </div>
  );
}
