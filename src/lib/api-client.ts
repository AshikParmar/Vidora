
import { IVideo } from "@/models/Video";
import { UserState, userVideos } from "@/types/types";

export type VideoFormData = Omit<IVideo, "_id">;

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  }

  async getVideos(search = ""): Promise<{ videos: IVideo[] }> {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    return this.fetch<{ videos: IVideo[] }>(`/videos${query}`);
  }

  async createVideo(videoData: VideoFormData) {
    return this.fetch("/videos", {
      method: "POST",
      body: videoData,
    });
  }

  async getProfile(id: string): Promise<{ user: UserState }> {
    return this.fetch<{ user: UserState }>(`/user/${id}`);
  }

  async updateProfile(id: string, profileData: Partial<UserState>): Promise<{ user: UserState }> {
    return this.fetch(`/user/${id}`, {
      method: "PUT",
      body: profileData,
    });
  }

  async getUserVideos(userId: string): Promise<{ videos: userVideos[] }> {
    return this.fetch<{ videos: userVideos[] }>(`/videos/user/${userId}`);
  }

  async getVideoById(id: string): Promise<{ video: IVideo }> {
    return this.fetch<{ video: IVideo }>(`/videos/${id}`);
  }

  async getRelatedVideos(id: string): Promise<{ relatedVideos: IVideo[] }> {
    return this.fetch<{ relatedVideos: IVideo[] }>(`/videos/related/${id}`);
  }
}

export const apiClient = new ApiClient();