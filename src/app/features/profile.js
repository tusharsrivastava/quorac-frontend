import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../api";

export const fetchUserProfile = createAsyncThunk("fetchUserProfile", async (payload) => {
  if (!payload) {
    const response = await get(`/users`);
    return response.data;
  } else {
    const response = await get(`/users/${payload}`);
    return response.data;
  }
});

const userProfile = createSlice({
  name: "userProfile",
  initialState: {
    user: {
      id: "ee609adc-ff84-44e9-90d2-63a3e6ab7724",
      username: "anonymous",
      email: null,
      profileThumbnail: null,
      firstName: "Anonymous",
      lastName: "User",
      isVerified: false,
      createdAt: "2021-08-31T10:53:39.347Z",
      updatedAt: "2021-08-31T10:53:39.347Z"
    },
    isLoading: false,
    error: null
  },
  extraReducers: {
    [fetchUserProfile.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [fetchUserProfile.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  }
});

export default userProfile.reducer;
