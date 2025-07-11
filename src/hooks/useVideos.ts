// hooks/useVideos.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client'; 
import { IVideo } from '@/models/Video';
import { Tag } from '@/app/page';

const fetchVideos = async (search = "", tag: Tag): Promise<IVideo[]> => {
  const res = await apiClient.getVideos(search, tag);
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

export const useVideos = (search: string, tag: Tag) =>
  useQuery<IVideo[]>({
    queryKey: ['videos', search, tag],
    queryFn: () => fetchVideos(search, tag),
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
