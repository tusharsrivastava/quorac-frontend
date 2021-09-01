import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api';

const contentTypeFromPostType = (postType) => {
  switch (postType) {
    case "question":
      return "Unanswered";
    case "answer":
      return "Answer";
    case "article":
      return "Article";
    case "blog":
      return "Blog Post";
    default:
      return "";
  }
};

export const fetchSinglePost = createAsyncThunk("fetchSinglePost", async (payload, { dispatch }) => {
  const response = await api.get(`/posts/${payload}`);
  const post = response.data;

  return {
    post: {
      id: post.id,
      contentType: contentTypeFromPostType(post.type),
      type: "post",
      title: post.title,
      content: post.content,
      statistics: {
        upvotes: post.upvotes,
        downvotes: post.downvotes,
        comments: post.numComments,
        views: post.numLikes,
      },
      postedBy: {
        id: post.createdBy.id,
        username: post.createdBy.username,
        firstName: post.createdBy.firstName,
        lastName: post.createdBy.lastName,
        on: post.createdAt,
      },
      questioner: post.parent
        ? {
            id: post.parent?.createdBy.id,
            username: post.createdBy.username,
            firstName: post.parent?.createdBy.firstName,
            lastName: post.parent?.createdBy.lastName,
            on: post.parent?.createdAt,
          }
        : null,
      category: post.category,
      tags: post.tags,
    },
    comments: [],
  };
});

export const addComment = createAsyncThunk("addComment", async (payload, { dispatch }) => {
  const { postId, comment } = payload;

  const response = await api.post(`/posts/${postId}/comments`, { content: comment });

  dispatch(incrementCommentsCount());

  return response.data;
});

export const fetchComments = createAsyncThunk("fetchComments", async (payload, { dispatch }) => {
  const response = await api.get(`/posts/${payload}/comments`);
  return response.data;
});

const singlePost = createSlice({
  name: "singlePost",
  initialState: {
    post: {},
    comments: [],
    commentCount: 0,
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
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload.data,
        commentCount: action.payload.count,
        isLoading: false,
        isError: false,
        isNew: false,
        isEditing: false,
        error: null,
      };
    });
  },
});

export const { downvotePost, upvotePost, incrementCommentsCount } = singlePost.actions;

export default singlePost.reducer;
