import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSinglePost = createAsyncThunk("fetchSinglePost", async (payload, { dispatch }) => {
  const { id } = payload;

  return {
    post: {
      id: id,
      type: "post",
      contentType: "Question",
      title: "How to use Redux?",
      // Write a paragraph on redux and its uses
      content: `
        Redux is a state management library. It is a toolkit for managing the state of your application.
        It is a library that helps you to keep your application state in a single place.
      `,
      statistics: {
        views: 199,
        upvotes: 10,
        downvotes: 0,
        comments: 1,
      },
    },
    comments: [],
  };
});

export const addComment = createAsyncThunk("addComment", async (payload, { dispatch }) => {
  const { postId, comment } = payload;

  dispatch(incrementCommentsCount());

  return {
    id: 1,
    postId: postId,
    content: comment,
  };
});

const singlePost = createSlice({
  name: "singlePost",
  initialState: {
    post: {},
    comments: [],
    isLoading: false,
    isError: false,
    isNew: false,
    isEditing: false,
    error: null,
  },
  reducers: {
    upvotePost: (state) => {
      return {
        ...state,
        post: {
          ...state.post,
          statistics: {
            ...state.post.statistics,
            upvotes: state.post.statistics.upvotes + 1,
          },
        },
      };
    },
    downvotePost: (state) => {
      return {
        ...state,
        post: {
          ...state.post,
          statistics: {
            ...state.post.statistics,
            downvotes: state.post.statistics.downvotes + 1,
          },
        },
      };
    },
    incrementCommentsCount: (state) => {
      return {
        ...state,
        post: {
          ...state.post,
          statistics: {
            ...state.post.statistics,
            comments: state.post.statistics.comments + 1,
          },
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSinglePost.fulfilled, (state, action) => {
      return {
        ...state,
        post: action.payload.post,
        comments: [
          ...state.comments,
          ...action.payload.comments,
        ],
        isLoading: false,
        isError: false,
        isNew: false,
        isEditing: false,
        error: null,
      };
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [
          ...state.comments,
          action.payload,
        ],
      };
    });
  },
});

export const { downvotePost, upvotePost, incrementCommentsCount } = singlePost.actions;

export default singlePost.reducer;
