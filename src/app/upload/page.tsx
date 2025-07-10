"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { useSession } from "next-auth/react";
import FileUpload from "@/components/Video/FileUpload";

export default function UploadPage() {
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("")
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleUploadSuccess = (res: any) => {
    setVideoUrl(res.url);
    setIsUploading(false);
    console.log("Upload successful:", res);
  };

  const handleUploadProgress = (progress: number) => {
    setUploadProgress(progress);
    setIsUploading(progress < 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim() || !videoUrl) {
      setError("Please fill all fields and upload a video");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.createVideo({
        title,
        description,
        tags: tags.split(",").map(tag => tag.trim().toLowerCase()),
        videoUrl,
        thumbnailUrl: "",
        uploadedBy: session?.user?.id as string,
      });

      router.push("/profile/" + session?.user?.id);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save video");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Video</h1>
            <p className="text-gray-600">Share your content with the world</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File
              </label>
              <div className="space-y-4">

                {videoUrl ? (
                  <div className="relative w-80 overflow-hidden">
                 
                    <video
                      src={videoUrl}
                      className="w-full h-full object-contain rounded-lg"
                    />

                    {/* Cancel Button */}
                    <button
                      type="button"
                      onClick={() => setVideoUrl("")}
                      className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition-all"
                    >
                      Cancel
                    </button>

                    <p className="text-sm text-green-600 mt-2">✅ Video uploaded successfully!</p>
                  </div>
                ) : (
                  <FileUpload
                    onSuccess={handleUploadSuccess}
                    onProgress={handleUploadProgress}
                    fileType="video"
                  />
                )}


                {/* Upload Progress */}
                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                    <p className="text-sm text-gray-600 mt-2">{uploadProgress}% uploaded</p>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Tags *
              </label>
              <input
                id="tags"
                type="text"
                placeholder="Enter video tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                placeholder="Describe your video..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3  border bg-gray-50 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 resize-vertical"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isUploading || !videoUrl}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                "Publish Video"
              )}
            </button>
          </form>

          {/* Upload Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">Upload Guidelines:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Maximum file size: 100MB</li>
              <li>• Supported formats: MP4, AVI, MOV, WMV</li>
              <li>• Make sure your title is descriptive</li>
              <li>• Add a detailed description to help viewers understand your content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}