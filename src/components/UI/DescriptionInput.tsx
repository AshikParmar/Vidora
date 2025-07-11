import { apiClient } from '@/lib/api-client';
import React, { useState } from 'react'

type DescriptionInputProps = {
    title: string;
    tags: string;
    description: string;
    setDescription: (value: string) => void;
}

const DescriptionInput = ({ title, tags, description, setDescription }: DescriptionInputProps) => {
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    
    const handleGenerateDescription = async() => {
        if (!title || !tags) return;
        const tagsArr = tags.split(",")
        try {
            console.log("here i am")
            setIsGenerating(true);
            const generatedDescription = await apiClient.generateDescription(title, tagsArr);
            setDescription(generatedDescription.message);
        } catch (error) {
            console.error("Error generating description:", error);
        } finally {
            setIsGenerating(false);
        }
    }
    
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description *
                </label>
                <button
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={!title || !tags || isGenerating}
                    className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center gap-1"
                >
                    {isGenerating ? (
                        <>
                            <svg className="animate-spin h-3 w-3 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            ✨ Generate with AI
                        </>
                    )}
                </button>
            </div>
            <textarea
                id="description"
                placeholder="Describe your video..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 border bg-gray-50 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 resize-vertical"
            />
        </div>
    )
}

export default DescriptionInput