// hooks/useVideos.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client'; 
import { IVideo } from '@/models/Video';

const fetchVideos = async (search = ""): Promise<IVideo[]> => {
  const res = await apiClient.getVideos(search);
  return res.videos;
};

const fetchVideoById = async (id: string): Promise<IVideo> => {
  const res = await apiClient.getVideoById(id);
  return res.video;
};

const fetchRelatedVideos = async (id: string): Promise<IVideo[]> => {
  const res = await apiClient.getRelatedVideos(id);
  return res.relatedVideos;
};

export const useVideos = (search: string) =>
  useQuery<IVideo[]>({
    queryKey: ['videos', search],
    queryFn: () => fetchVideos(search),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });


  export const useSingleVideo = (id: string) => {
  return useQuery({
    queryKey: ["video", id],
    queryFn: () => fetchVideoById(id),
    enabled: !!id,
  });
};

export const useRelatedVideos = (id: string) => {
  return useQuery({
    queryKey: ["relatedVideos", id],
    queryFn: () => fetchRelatedVideos(id),
    enabled: !!id,
  });
};
