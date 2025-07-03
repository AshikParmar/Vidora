import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideo } from '@/models/Video';

interface VideoState {
  videos: IVideo[];
  loading: boolean;
  error: string | null;
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<IVideo[]>) => {
      state.videos = action.payload;
      state.loading = false;
      state.error = null;
    },
    addVideo: (state, action: PayloadAction<IVideo>) => {
      state.videos.unshift(action.payload); // add to top
    },
    removeVideo: (state, action: PayloadAction<string>) => {
      state.videos = state.videos.filter(video => video._id !== action.payload);
    },
    setVideoLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setVideoError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearVideos: (state) => {
      state.videos = [];
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  setVideos,
  addVideo,
  removeVideo,
  setVideoLoading,
  setVideoError,
  clearVideos
} = videoSlice.actions;

export default videoSlice.reducer;
