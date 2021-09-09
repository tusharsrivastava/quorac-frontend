import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get, post } from '../api';

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
  const response = await get(`/posts/${payload}`);
  const post = response.data;

  return {
    post: {
      id: post.id,
      contentType: contentTypeFromPostType(post.type),
      type: "post",
      title: post.title,
      content: post.content,
      hasUpvoted: post.hasUpvoted,
      hasDownvoted: post.hasDownvoted,
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

  const response = await post(`/posts/${postId}/comments`, { content: comment });

  dispatch(incrementCommentsCount());

  return response.data;
});

export const fetchComments = createAsyncThunk("fetchComments", async (payload, { dispatch }) => {
  const response = await get(`/posts/${payload}/comments`);
  return response.data;
});

export const upvotePost = createAsyncThunk("upvotePost", async (post) => {
  const response = {
    id: post.id,
    downvotes: post.statistics.downvotes,
    upvotes: post.statistics.upvotes,
    hasDownvoted: post.hasDownvoted,
    hasUpvoted: post.hasUpvoted,
  };

  if (post.hasDownvoted) {
    // remove downvote first
    const r = await post(`/posts/${post.id}/downvote`);
    response.downvotes = r.data.count;
    response.hasDownvoted = r.data.action;
  }
  // now upvote it
  const r = await post(`/posts/${post.id}/upvote`);

  response.upvotes = r.data.count;
  response.hasUpvoted = r.data.action;

    return response;
});

export const downvotePost = createAsyncThunk("downvotePost", async (post) => {
  const response = {
    id: post.id,
    downvotes: post.statistics.downvotes,
    upvotes: post.statistics.upvotes,
    hasDownvoted: post.hasDownvoted,
    hasUpvoted: post.hasUpvoted,
  };

  if (post.hasUpvoted) {
    // remove downvote first
    const r = await post(`/posts/${post.id}/upvote`);
    response.upvotes = r.data.count;
    response.hasUpvoted = r.data.action;
  }
  // now downvote it
  const r = await post(`/posts/${post.id}/downvote`);

  response.downvotes = r.data.count;
  response.hasDownvoted = r.data.action;

  return response;
});

export const upvoteComment = createAsyncThunk("upvoteComment", async (payload) => {
  const { postId, comment } = payload;
  const response = {
    postId: postId,
    id: comment.id,
    downvotes: comment.downvotes,
    upvotes: comment.upvotes,
    hasDownvoted: comment.hasDownvoted,
    hasUpvoted: comment.hasUpvoted,
  };

  if (comment.hasDownvoted) {
    // remove downvote first
    const r = await post(`/posts/${postId}/comments/${comment.id}/downvote`);
    response.downvotes = r.data.count;
    response.hasDownvoted = r.data.action;
  }
  // now upvote it
  const r = await post(`/posts/${postId}/comments/${comment.id}/upvote`);

  response.upvotes = r.data.count;
  response.hasUpvoted = r.data.action;

  return response;
});

export const downvoteComment = createAsyncThunk("downvoteComment", async (payload) => {
  const { postId, comment } = payload;
  const response = {
    postId: postId,
    id: comment.id,
    downvotes: comment.downvotes,
    upvotes: comment.upvotes,
    hasDownvoted: comment.hasDownvoted,
    hasUpvoted: comment.hasUpvoted,
  };

  if (comment.hasUpvoted) {
    // remove upvote first
    const r = await post(`/posts/${postId}/comments/${comment.id}/upvote`);
    response.upvotes = r.data.count;
    response.hasUpvoted = r.data.action;
  }

  // now downvote it
  const r = await post(`/posts/${postId}/comments/${comment.id}/upvote`);

  response.downvotes = r.data.count;
  response.hasDownvoted = r.data.action;

  return response;
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
    builder.addCase(upvotePost.fulfilled, (state, action) => {
      return {
        ...state,
        post: {
            ...state.post,
            hasUpvoted: action.payload.hasUpvoted,
            hasDownvoted: action.payload.hasDownvoted,
            statistics: {
              ...state.post.statistics,
              upvotes: action.payload.upvotes,
              downvotes: action.payload.downvotes,
            },
        },
      };
    });
    builder.addCase(downvotePost.fulfilled, (state, action) => {
      return {
        ...state,
        post: {
          ...state.post,
          hasUpvoted: action.payload.hasUpvoted,
          hasDownvoted: action.payload.hasDownvoted,
          statistics: {
            ...state.post.statistics,
            upvotes: action.payload.upvotes,
            downvotes: action.payload.downvotes,
          },
        },
      };
    });
    builder.addCase(upvoteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              upvotes: action.payload.upvotes,
              downvotes: action.payload.downvotes,
            };
          }

          return comment;
        }),
      };
    });
    builder.addCase(downvoteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return {
              ...comment,
              upvotes: action.payload.upvotes,
              downvotes: action.payload.downvotes,
            };
          }

          return comment;
        }),
      };
    });
  },
});

export const { incrementCommentsCount } = singlePost.actions;

export default singlePost.reducer;
