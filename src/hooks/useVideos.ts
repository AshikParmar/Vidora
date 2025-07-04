// hooks/useVideos.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client'; 
import { IVideo } from '@/models/Video';

const fetchVideos = async (): Promise<IVideo[]> => {
  const res = await apiClient.getVideos(); 
  return res.videos;
};

export const useVideos = () =>
  useQuery<IVideo[]>({
    queryKey: ['videos'],
    queryFn: fetchVideos,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
