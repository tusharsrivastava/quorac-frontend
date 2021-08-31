import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api";
import history from "../history";

export const createNewPost = createAsyncThunk("createNewPost", async (payload) => {
  const response = await api.post("/posts", payload);
  return response.data;
});

export const newPost = createSlice({
  name: "newPost",
  initialState: {
    created: false,
    loading: false,
    error: null,
  },
  extraReducers: {
    [createNewPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.created = true;
      state.loading = false;
      history.push("/");
    },
    [createNewPost.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    }
  }
});

export default newPost.reducer;
