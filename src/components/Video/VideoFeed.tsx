"use client";

import VideoComponent from "./VideoComponent";
import { IVideo } from "@/models/Video";

interface VideoFeedProps {
  videos: IVideo[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function VideoFeed({ videos, isLoading, isError }: VideoFeedProps) {

  return (
    <div className="w-full h-full p-2">

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-xl aspect-video mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 text-lg font-medium">Error loading videos</p>
        </div>
      ) : (
        <>
          {videos?.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-200 mb-2">No videos Found</h3>
              {/* <p className="text-gray-500 text-lg">This user hasn't uploaded any videos yet.</p> */}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos?.map((video, index) => (
                <div
                  key={video._id?.toString()}
                  className="opacity-0 animate-fade-in transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <VideoComponent key={video._id?.toString()} video={video} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
    // <div className="w-full h-full p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
    //   {videos?.map((video) => (
    //     <VideoComponent key={video._id?.toString()} video={video} />
    //   ))}

    //   {videos?.length === 0 && (
    //     <div className="col-span-full text-center py-12">
    //       <p className="text-base-content/70">No videos found</p>
    //     </div>
    //   )}
    // </div>

  );
}