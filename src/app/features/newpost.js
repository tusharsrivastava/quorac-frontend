import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "../api";

export const createNewPost = createAsyncThunk("createNewPost", async (payload) => {
  const response = await post("/posts", payload);
  return response.data;
});

export const postNewAnswer = createAsyncThunk(
  "postNewAnswer",
  async (payload) => {
    const { postId, content } = payload;

    const response = await post(`/posts/${postId}/answers`, { type: "answer", content: content, title: "" });
    return response.data;
  }
);

export const newPost = createSlice({
  name: "newPost",
  initialState: {
    redirectTo: null,
    created: false,
    loading: false,
    error: null,
  },
  reducers: {
    setRedirectTo: (state, action) => {
      state.redirectTo = action.payload;
    },
    resetRedirect: (state, action) => {
      state.redirectTo = null;
    },
  },
  extraReducers: {
    [createNewPost.pending]: (state, action) => {
      state.redirectTo = null;
      state.created = false;
      state.loading = true;
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.created = true;
      state.loading = false;
      state.redirectTo = "/";
    },
    [createNewPost.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
      state.redirectTo = null;
    },
    [postNewAnswer.pending]: (state, action) => {
      state.created = false;
      state.loading = true;
    },
    [postNewAnswer.fulfilled]: (state, action) => {
      state.created = true;
      state.loading = false;
      state.redirectTo = "/";
    },
    [postNewAnswer.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
      state.redirectTo = null;
    },
  }
});

export const { setRedirectTo, resetRedirect } = newPost.actions;

export default newPost.reducer;
