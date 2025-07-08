"use client";

import SingleVideoCard from "@/components/Video/SingleVideoCard";
import VideoFeed from "@/components/Video/VideoFeed";
import { useRelatedVideos, useSingleVideo } from "@/hooks/useVideos";
import { setNextVideos, setSelectedVideo } from "@/store/slices/videoSlice";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const VideoPage = ({ params }: { params: Promise<{ videoId: string }>}) => {
    const { videoId }  = use(params);
    const dispatch = useDispatch();
    const selectedVideo = useSelector((state: any) => state.videos.selectedVideo);
    const nextVideos = useSelector((state: any) => state.videos.nextVideos);

    const { data: video, isLoading: loadingVideo, isError: videoError } = useSingleVideo(videoId);
    const { data: relatedVideos, isLoading: loadingRelated, isError: relatedError } = useRelatedVideos(videoId);

    useEffect(() => {
      console.log(relatedVideos);
        if (video) {
            dispatch(setSelectedVideo(video));
        }
        if (relatedVideos) {
            dispatch(setNextVideos(relatedVideos));
        }
    }, [video, relatedVideos]);

    if (loadingVideo) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading video...</p>
                </div>
            </div>
        );
    }

    if( !selectedVideo ) {
      return null;
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col p-4">
  
    <div className="flex justify-center w-full">
      <SingleVideoCard video={selectedVideo} />
    </div>

    <div className="mt-8 bg-gray-100 rounded-lg shadow-md p-4">
      <VideoFeed videos={nextVideos} isLoading={loadingRelated}/>
    </div>
    </div>
  )
}

export default  VideoPage;
