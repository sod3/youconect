import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (userId) => {
    const response = await axios.get(`/api/history/${userId}`);
    return response.data;
  },
);

export const addVideoToHistory = createAsyncThunk(
  "history/addVideoToHistory",
  async (video) => {
    await axios.post(`/api/history`, { videoId: video._id });
    return video;
  },
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    videos: [], // Make sure to initialize videos as an empty array
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.videos = action.payload;
      })
      .addCase(addVideoToHistory.fulfilled, (state, action) => {
        state.videos = [action.payload, ...state.videos];
      });
  },
});

export default historySlice.reducer;
