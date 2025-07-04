// hooks/useVideos.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client'; 
import { UserState } from '@/types/types';

const fetchProfile = async (id: string): Promise<UserState> => {
  const res = await apiClient.getProfile(id); 
  return res.user;
};

const fetchUserVideos = async (userId: string) => {
  const res = await apiClient.getUserVideos(userId);
  return res.videos;
};

export const useProfile = (id: string) =>
  useQuery<UserState>({
    queryKey: ['profile', id],
    queryFn: () => fetchProfile(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });


export const useUserVideos = (userId: string) =>
  useQuery({
    queryKey: ['userVideos', userId],
    queryFn: () => fetchUserVideos(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });