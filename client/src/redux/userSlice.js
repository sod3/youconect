import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  subscriptions: [],
};

// Thunk to fetch subscriptions
export const fetchSubscriptions = createAsyncThunk(
  "user/fetchSubscriptions",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/users/${userId}/subscriptions`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state, action) => {
      const { subscribedUsers } = state.currentUser;
      if (subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers = subscribedUsers.filter(
          (channelId) => channelId !== action.payload,
        );
      } else {
        subscribedUsers.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
  userSlice.actions;

export default userSlice.reducer;
