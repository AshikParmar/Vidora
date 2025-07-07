// hooks/useVideos.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client'; 
import { UserState, userVideos } from '@/types/types';

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
    enabled: !!id,
  });



export const useUserVideos = (
  userId: string,
  options?: UseQueryOptions<userVideos[], Error>
) => {
  return useQuery<userVideos[], Error>({
    queryKey: ['userVideos', userId],
    queryFn: () => fetchUserVideos(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
